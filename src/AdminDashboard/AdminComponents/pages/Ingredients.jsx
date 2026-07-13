import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Search from "../../../assets/Search.svg";
import AllergyModal from "../../../Utility/AllergyModal";
import IngredientModal from "../../../Utility/IngredientModal";
import CustomSelect from "../../../Utility/CustomSelect";
import ReusableTable from "../../../Utility/ReusableTable";
import { useIngredients } from "../hooks/useIngredients";
import { useAllergies } from "../hooks/useAllergies";
import TableSkeleton from "../../../Utility/skeletons/TableSkeleton";
import PaginationFooter from "./PaginationFooter";
import api from "../../../Utility/api";
import { useDashboard } from "../../Context/DashboardContext";
import DeleteConfirmModal from "../../../Utility/DeleteConfirmModal";
import { useToast } from "../../Context/ToastProvider";

const SORT_OPTIONS = [
  "default",
  "name:asc",
  "name:desc",
  "created_at:desc",
  "created_at:asc",
];

const Ingredients = () => {
  const [activeTab, setActiveTab] = useState("ingredients");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);
  const { page, setPage, search, setSearch } = useDashboard();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: ingredientsData,
    isLoading: ingredientsLoading,
    isError: ingredientsError,
    refetch: refetchIngredients,
  } = useIngredients({
    page,
    search,
    sortBy,
    sortDirection,
    perPage: 10,
  });

  const {
    data: allergiesData,
    isLoading: allergiesLoading,
    isError: allergiesError,
    refetch: refetchAllergies,
  } = useAllergies({
    page,
    search,
  });

  const ingredients = ingredientsData?.data ?? [];
  const allergies = allergiesData?.data ?? [];
  const sortValue =
    sortBy && sortDirection ? `${sortBy}:${sortDirection}` : "default";
  const isIngredientsTab = activeTab === "ingredients";
  const currentData = isIngredientsTab ? ingredientsData : allergiesData;
  const isLoading = isIngredientsTab ? ingredientsLoading : allergiesLoading;
  const isError = isIngredientsTab ? ingredientsError : allergiesError;
  const tableData = isIngredientsTab ? ingredients : allergies;

  const openAddModal = () => {
    setModalMode("add");
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (row) => {
    setModalMode("edit");
    setSelectedItem(row);
    setIsModalOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      setIsSubmitting(true);

      if (isIngredientsTab) {
        let dataToSend = form;
        let headers = {};

        if (form.image) {
          const formData = new FormData();
          formData.append("name", form.name);
          formData.append("category", form.category);
          formData.append("default_unit", form.default_unit);
          formData.append("description", form.description || "");
          formData.append("image", form.image);
          if (modalMode !== "add") formData.append("_method", "PUT");

          dataToSend = formData;
          headers = { "Content-Type": "multipart/form-data" };
        }

        if (modalMode === "add") {
          await api.post("/admin/ingredients", dataToSend, { headers });
        } else if (form.image) {
          await api.post(`/admin/ingredients/${selectedItem.id}`, dataToSend, {
            headers,
          });
        } else {
          await api.put(`/admin/ingredients/${selectedItem.id}`, dataToSend);
        }
      } else {
        if (modalMode === "add") {
          await api.post("/admin/allergies", form);
        } else {
          await api.put(`/admin/allergies/${selectedItem.id}`, form);
        }
      }

      showToast({
        title: "Success",
        description:
          modalMode === "add"
            ? `${isIngredientsTab ? "Ingredient" : "Allergy"} created successfully`
            : `${isIngredientsTab ? "Ingredient" : "Allergy"} updated successfully`,
        variant: "success",
      });

      setIsModalOpen(false);
      if (isIngredientsTab) {
        refetchIngredients();
      } else {
        refetchAllergies();
      }
    } catch (error) {
      console.error(`Failed to save ${isIngredientsTab ? "ingredient" : "allergy"}`, error);
      showToast({
        title: "Error",
        description:
          error.response?.data?.message ||
          `Failed to save ${isIngredientsTab ? "ingredient" : "allergy"}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (row) => {
    setItemToDelete(row);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      setIsDeleting(true);

      if (isIngredientsTab) {
        await api.delete(`/admin/ingredients/${itemToDelete.id}`);
      } else {
        await api.delete(`/admin/allergies/${itemToDelete.id}`);
      }

      setDeleteModalOpen(false);
      setItemToDelete(null);

      showToast({
        title: "Success",
        description: `${isIngredientsTab ? "Ingredient" : "Allergy"} deleted successfully`,
        variant: "success",
      });

      if (isIngredientsTab) {
        refetchIngredients();
      } else {
        refetchAllergies();
      }
    } catch (err) {
      console.error(`Failed to delete ${isIngredientsTab ? "ingredient" : "allergy"}`, err);
      showToast({
        title: "Error",
        description:
          err.response?.data?.message ||
          `Failed to delete ${isIngredientsTab ? "ingredient" : "allergy"}`,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isError) {
    return (
      <p className="p-10">
        Failed to load {isIngredientsTab ? "ingredients" : "allergies"}
      </p>
    );
  }

  const allergyColumns = [
    {
      label: "Allergy Name",
      accessor: "name",
      className: "font-medium text-brand-cardhead",
    },
    {
      label: "Tags Count",
      accessor: "tags_count",
      render: (value) => value ?? 0,
    },
    {
      label: "Tags",
      accessor: "tags",
      render: (value) =>
        Array.isArray(value)
          ? value
              .map((tag) => tag?.title || tag?.name || "")
              .filter(Boolean)
              .join(", ") || "-"
          : "-",
    },
    {
      label: "Used In",
      accessor: "used_in_recipes_count",
      render: (value) => `${value ?? 0} recipe${value === 1 ? "" : "s"}`,
    },
  ];

  const formatSortOption = (value) => {
    switch (value) {
      case "default":
        return "Default Order";
      case "name:asc":
        return "Name (A-Z)";
      case "name:desc":
        return "Name (Z-A)";
      case "created_at:desc":
        return "Recent";
      case "created_at:asc":
        return "Oldest";
      default:
        return value;
    }
  };

  const handleSortChange = (value) => {
    if (value === "default") {
      setSortBy("");
      setSortDirection("");
      setPage(1);
      return;
    }

    const [nextSortBy, nextSortDirection] = value.split(":");
    setSortBy(nextSortBy || "");
    setSortDirection(nextSortDirection || "");
    setPage(1);
  };

  return (
    <>
      <section className="bg-brand-background1 min-h-screen py-10 ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-10 gap-4">
          <div>
            <h2 className="text-brand-cardhead font-medium text-xl mb-2">
              Ingredients Library
            </h2>
            <p className="text-brand-subtext">
              Manage reusable ingredients and allergies linked across recipes.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row w-full md:w-auto justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder={
                  isIngredientsTab
                    ? "Search ingredient..."
                    : "Search allergy..."
                }
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 pr-12 border bg-brand-carhead border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              />
              <img
                src={Search}
                alt="Search"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60 pointer-events-none"
              />
            </div>

            <button
              onClick={openAddModal}
              className="cursor-pointer w-full sm:w-auto bg-brand-secondary text-white text-sm sm:text-base px-6 py-2 rounded-2xl font-medium hover:opacity-90 transition whitespace-nowrap"
            >
              {isIngredientsTab ? "Add Ingredient" : "Add Allergy"}
            </button>
          </div>
        </div>

        <Tabs.Root
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            setPage(1);
            setSortBy("");
            setSortDirection("");
            setIsModalOpen(false);
            setDeleteModalOpen(false);
            setSelectedItem(null);
            setItemToDelete(null);
          }}
          className="flex flex-col mt-6 px-4 sm:px-10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Tabs.List className="flex w-full max-w-sm gap-4">
              <Tabs.Trigger
                value="ingredients"
                className={`flex-1 py-2 rounded-lg font-medium transition ${
                  activeTab === "ingredients"
                    ? "bg-brand-secondary text-white"
                    : "bg-transparent border border-brand-planoff text-brand-muted"
                }`}
              >
                Ingredients
              </Tabs.Trigger>

              <Tabs.Trigger
                value="allergies"
                className={`flex-1 py-2 rounded-lg font-medium transition ${
                  activeTab === "allergies"
                    ? "bg-brand-secondary text-white"
                    : "bg-transparent border border-brand-planoff text-brand-muted"
                }`}
              >
                Allergies
              </Tabs.Trigger>
            </Tabs.List>

            {isIngredientsTab && (
              <div className="mt-4 flex justify-start sm:justify-end">
                <div className="w-full sm:w-64">
                  <CustomSelect
                    label="Sort By"
                    options={SORT_OPTIONS}
                    value={sortValue}
                    onChange={handleSortChange}
                    formatOption={formatSortOption}
                    classNameLabel="text-brand-cartext"
                    classNameSelect="border-brand-planoff"
                  />
                </div>
              </div>
            )}

          </div>

          {isLoading ? (
            <div className="pt-8">
              <TableSkeleton />
            </div>
          ) : tableData.length === 0 ? (
            <div className="mt-8 text-center text-brand-subtext">
              No {isIngredientsTab ? "ingredients" : "allergies"} found.
            </div>
          ) : (
            <div className="mt-8">
              <ReusableTable
                columns={
                  isIngredientsTab
                    ? [
                        {
                          label: "Ingredient",
                          accessor: "name",
                          className: "font-medium text-brand-cardhead",
                        },
                        {
                          label: "Category",
                          accessor: "category",
                        },
                        {
                          label: "Default Unit",
                          accessor: "default_unit",
                        },
                        {
                          label: "Used In",
                          accessor: "recipes_count",
                          render: (value) =>
                            `${value ?? 0} recipe${value === 1 ? "" : "s"}`,
                        },
                      ]
                    : allergyColumns
                }
                data={tableData}
                actions="editDelete"
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            </div>
          )}
        </Tabs.Root>

        <IngredientModal
          open={isIngredientsTab && isModalOpen}
          mode={modalMode}
          initialValues={selectedItem}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          loading={isSubmitting}
        />

        <AllergyModal
          open={!isIngredientsTab && isModalOpen}
          mode={modalMode}
          initialValues={selectedItem}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          loading={isSubmitting}
        />

        <DeleteConfirmModal
          open={deleteModalOpen}
          onClose={() => !isDeleting && setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          loading={isDeleting}
          title={isIngredientsTab ? "Delete Ingredient" : "Delete Allergy"}
          subtext={
            isIngredientsTab
              ? "Are you certain you want to delete this ingredient? Once removed, it will no longer appear in any recipes it was associated with."
              : "Are you certain you want to delete this allergy? Once removed, recipes and related ingredient mappings will no longer reference it."
          }
          actionBtn={isIngredientsTab ? "Yes, Remove" : "Delete Allergy"}
        />
      </section>

      {currentData && (
        <PaginationFooter
          currentPage={currentData.current_page}
          lastPage={currentData.last_page}
          onPageChange={(page) => setPage(page)}
          onPrev={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => setPage((p) => Math.min(p + 1, currentData.last_page))}
        />
      )}
    </>
  );
};

export default Ingredients;
