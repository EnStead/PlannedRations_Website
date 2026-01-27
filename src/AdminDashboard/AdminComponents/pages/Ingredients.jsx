import { useState } from "react";
import Search from "../../../assets/Search.svg";
import IngredientModal from "../../../Utility/IngredientModal";
import ReusableTable from "../../../Utility/ReusableTable";
import { useIngredients } from "../hooks/useIngredients";
import TableSkeleton from "../../../Utility/skeletons/TableSkeleton";
import PaginationFooter from "./PaginationFooter";
import api from "../../../Utility/api";
import { useDashboard } from "../../Context/DashboardContext";
import DeleteConfirmModal from "../../../Utility/DeleteConfirmModal";

const Ingredients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);
  const { page, setPage, search, setSearch } = useDashboard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isLoading, isError, refetch } = useIngredients({
    page,
    search,
  });

  const ingredients = data?.data ?? [];

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

      let dataToSend = form;
      let headers = {};

      // If we have an image, we must use FormData
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
      } else {
        // Use POST with _method=PUT if sending FormData, otherwise standard PUT
        if (form.image) {
          await api.post(`/admin/ingredients/${selectedItem.id}`, dataToSend, { headers });
        } else {
          await api.put(`/admin/ingredients/${selectedItem.id}`, dataToSend);
        }
      }

      setIsModalOpen(false);
      refetch();
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (row) => {
    setIngredientToDelete(row);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!ingredientToDelete) return;

    try {
      setIsDeleting(true);

      await api.delete(`/admin/ingredients/${ingredientToDelete.id}`);

      setDeleteModalOpen(false);
      setIngredientToDelete(null);

      refetch();
    } catch (err) {
      console.error("Failed to delete ingredient", err);
    } finally {
      setIsDeleting(false);
    }
  };

  {
    isLoading && <TableSkeleton />;
  }

  {
    !isLoading && ingredients.length === 0 && (
      <p className="text-center text-brand-subtext py-10">
        No ingredients found.
      </p>
    );
  }

  if (isError) return <p className="p-10">Failed to load users</p>;

  return (
    <>
      <section className="bg-brand-background1 min-h-screen py-10 ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-10 gap-4">
          <div>
            <h2 className="text-brand-cardhead font-medium text-xl mb-2">
              Ingredients Library
            </h2>
            <p className="text-brand-subtext">
              Ingredients Library Manage reusable Ingredients linked across
              recipes.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row w-full md:w-auto justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search ingredient..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // reset pagination on search
                }}
                className="w-full px-4 py-2 pr-12 border bg-brand-carhead border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              />
            </div>

            <button
              onClick={openAddModal}
              className=" cursor-pointer w-full sm:w-auto bg-brand-secondary text-white text-sm sm:text-base px-6 py-2  rounded-2xl font-medium hover:opacity-90 transition whitespace-nowrap"
            >
              Add Ingredient
            </button>
          </div>
        </div>
        <div className="mt-8">
          <ReusableTable
            columns={[
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
                render: (value) => `${value} recipe${value !== 1 ? "s" : ""}`,
              },
            ]}
            data={ingredients}
            actions="editDelete"
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </div>

        <IngredientModal
          open={isModalOpen}
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
          title={"Delete Ingredient"}
          subtext={
            "Are you certain you want to delete this ingredient? Once removed, it will no longer appear in any recipes it was associated with."
          }
          actionBtn={"Yes, Remove"}
        />
      </section>

      {data && (
        <PaginationFooter
          currentPage={data.current_page}
          lastPage={data.last_page}
          onPageChange={(page) => setPage(page)}
          onPrev={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => setPage((p) => Math.min(p + 1, data.last_page))}
        />
      )}
    </>
  );
};

export default Ingredients;
