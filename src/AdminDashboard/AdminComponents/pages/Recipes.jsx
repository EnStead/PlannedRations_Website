import { useState } from "react";
import { useToast } from "../../Context/ToastProvider";
import { useRecipe } from "../hooks/useRecipe";
import { useNavigate } from "react-router-dom";
import api from "../../../Utility/api";
import * as Tabs from "@radix-ui/react-tabs";
import ReusableTable from "../../../Utility/ReusableTable";
import PaginationFooter from "./PaginationFooter";
import RecipeDetailsSlideModal from "./RecipeDetailsSlideModal";
import DeleteConfirmModal from "../../../Utility/DeleteConfirmModal";
import PublishConfirmModal from "../../../Utility/PublishConfirmModal";
import UnpublishConfirmModal from "../../../Utility/UnpublishConfirmModal";
import { useDashboard } from "../../Context/DashboardContext";

const Recipes = () => {
  const [activeTab, setActiveTab] = useState("published");
  const { page, setPage, search, setSearch } = useDashboard();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [recipeDetailsOpen, setRecipeDetailsOpen] = useState(false);
  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // Publish Modal
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [selectedRecipeToPublish, setSelectedRecipeToPublish] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  // Unpublish Modal
  const [unpublishModalOpen, setUnpublishModalOpen] = useState(false);
  const [selectedRecipeToUnpublish, setSelectedRecipeToUnpublish] =
    useState(null);
  const [isUnpublishing, setIsUnpublishing] = useState(false);

  const { data, isLoading, isError, refetch } = useRecipe({
    tab: activeTab,
    page,
    search,
  });

  const recipes = data?.data ?? [];

  // --- API functions ---
  const handlePublish = async () => {
    if (!selectedRecipeToPublish) return;

    try {
      setIsPublishing(true);
      const response = await api.post(
        `/admin/recipes/${selectedRecipeToPublish.id}/publish`,
      );

      showToast({
        title: "Success",
        description: response.data.message || "Published Successfully",
        variant: "success",
      });

      refetch();
      setPublishModalOpen(false);
      setSelectedRecipeToPublish(null);
    } catch (err) {
      console.error(err);
      showToast({
        title: "Error",
        description: "Failed to publish recipe",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    if (!selectedRecipeToUnpublish) return;

    try {
      setIsUnpublishing(true);
      const response = await api.post(
        `/admin/recipes/${selectedRecipeToUnpublish.id}/unpublish`,
      );

      showToast({
        title: "Success",
        description: response.data.message,
        variant: "success",
      });

      refetch();
      setUnpublishModalOpen(false);
      setSelectedRecipeToUnpublish(null);
    } catch (err) {
      console.error(err);
      showToast({
        title: "Error",
        description: "Failed to publish recipe",
        variant: "destructive",
      });
    } finally {
      setIsUnpublishing(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRecipe) return;

    try {
      setIsDeleting(true);
      const response = await api.delete(`/admin/recipes/${selectedRecipe.id}`);

      showToast({
        title: "Success",
        description: response.data.message || "Deleted Succesfully",
        variant: "success",
      });

      refetch(); // update the table
      setDeleteModalOpen(false); // close the modal
      setSelectedRecipe(null); // clear selection
    } catch (err) {
      console.error(err);
      showToast({
        title: "Error",
        description: "Failed to delete recipe",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRecipeAction = (action, recipe) => {
    switch (action) {
      case "view":
        setSelectedRecipeId(recipe.id);
        setRecipeDetailsOpen(true);
        break;

      case "edit":
        navigate(`/admin/recipes/edit-recipe/${recipe.id}`);
        break;

      case "publish":
        setSelectedRecipeToPublish(recipe);
        setPublishModalOpen(true);
        break;

      case "unpublish":
        setSelectedRecipeToUnpublish(recipe);
        setUnpublishModalOpen(true);
        break;

      case "delete":
        setSelectedRecipe(recipe);
        setDeleteModalOpen(true);
        break;

      default:
        break;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <>
      <section className="bg-brand-background1 min-h-screen py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-10 gap-4">
          <div>
            <h2 className="text-brand-cardhead font-medium text-xl mb-2 font-dash">
              Recipe Manager
            </h2>
            <p className="text-brand-subtext">
              Create, edit, or view recipes in the library
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row w-full md:w-auto justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search by title, tag"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // reset pagination
                }}
                className="w-full px-4 py-2 pr-12 border bg-brand-carhead border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              />
            </div>

            <button
              onClick={() => navigate("add-recipe")}
              className="cursor-pointer w-full sm:w-auto bg-brand-secondary text-white text-sm sm:text-base px-6 py-2 rounded-2xl font-medium hover:opacity-90 transition whitespace-nowrap"
            >
              Add New Recipe
            </button>
          </div>
        </div>

        <Tabs.Root
          defaultValue="published"
          onValueChange={(value) => {
            setActiveTab(value);
            setPage(1); // reset page when tab changes
          }}
          className="flex flex-col mt-6 px-4 sm:px-0"
        >
          <Tabs.List className="flex max-w-md gap-4 sm:pl-10">
            <Tabs.Trigger
              value="published"
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                activeTab === "published"
                  ? "bg-brand-secondary text-white"
                  : "bg-transparent border border-brand-planoff text-brand-muted"
              }`}
            >
              Published
            </Tabs.Trigger>

            <Tabs.Trigger
              value="drafts"
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                activeTab === "drafts"
                  ? "bg-brand-secondary text-white"
                  : "bg-transparent border border-brand-planoff text-brand-muted"
              }`}
            >
              My Drafts
            </Tabs.Trigger>
          </Tabs.List>

          {isLoading ? (
            <div className="mt-4 text-center text-brand-muted">Loading...</div>
          ) : isError ? (
            <div className="mt-4 text-center text-red-500">
              Failed to load recipe.
            </div>
          ) : recipes.length === 0 ? (
            <div className="mt-4 text-center text-brand-subtext">
              No recipe found.
            </div>
          ) : (
            <>
              <Tabs.Content value="published" className="mt-4">
                <ReusableTable
                  columns={[
                    {
                      label: "Recipe Name",
                      accessor: "name",
                      className: "font-medium text-brand-cardhead",
                    },
                    {
                      label: "Base Serving",
                      accessor: "base_servings",
                    },
                    {
                      label: "Calories",
                      accessor: "calories",
                      render: (value) => (value ? `${value} kcal` : "—"),
                    },
                    {
                      label: "Cooking Time",
                      accessor: "cooking_time",
                      render: (value) => (value ? `${value} min` : "—"),
                    },
                    {
                      label: "Recipe Steps",
                      accessor: "steps_count",
                    },
                    {
                      label: "Difficulty",
                      accessor: "difficulty",
                    },
                    {
                      label: "Ratings",
                      accessor: "ratings_avg_rating",
                      render: (value) => (value ? `${value} star` : "—"),
                    },
                  ]}
                  data={activeTab === "published" ? recipes : []}
                  actions="menu"
                  menuItems={[
                    { label: "View Recipe", action: "view" },
                    { label: "Edit Recipe", action: "edit" },
                    { label: "Unpublish Recipe", action: "unpublish" },
                    {
                      label: "Delete Recipe",
                      action: "delete",
                      destructive: true,
                    },
                  ]}
                  onAction={handleRecipeAction}
                />
              </Tabs.Content>

              <Tabs.Content value="drafts" className="mt-4">
                <ReusableTable
                  columns={[
                    {
                      label: "Recipe Name",
                      accessor: "name",
                      className: "font-medium text-brand-cardhead",
                    },
                    {
                      label: "Base Serving",
                      accessor: "base_servings",
                    },
                    {
                      label: "Calories",
                      accessor: "calories",
                      render: (value) => (value ? `${value} kcal` : "—"),
                    },
                    {
                      label: "Cooking Time",
                      accessor: "cooking_time",
                      render: (value) => (value ? `${value} min` : "—"),
                    },
                    {
                      label: "Recipe Steps",
                      accessor: "steps_count",
                    },
                    {
                      label: "Difficulty",
                      accessor: "difficulty",
                    },
                    {
                      label: "Last Saved",
                      accessor: "updated_at",
                      render: (value) => formatDate(value),
                    },
                  ]}
                  data={activeTab === "drafts" ? recipes : []}
                  actions="menu"
                  menuItems={[
                    { label: "Edit Recipe", action: "edit" },
                    { label: "Publish Recipe", action: "publish" },
                    {
                      label: "Delete Recipe",
                      action: "delete",
                      destructive: true,
                    },
                  ]}
                  onAction={handleRecipeAction}
                />
              </Tabs.Content>
            </>
          )}
        </Tabs.Root>
      </section>

      <RecipeDetailsSlideModal
        open={recipeDetailsOpen}
        onOpenChange={setRecipeDetailsOpen}
        recipe={selectedRecipeId}
        onEdit={() => {
          setRecipeDetailsOpen(false);
          navigate(`edit-recipe/${selectedRecipeId}`);
        }}
        onUnpublish={(recipe) => {
          setRecipeDetailsOpen(false);
          handleRecipeAction("unpublish", recipe);
        }}
        onDelete={(recipe) => {
          setRecipeDetailsOpen(false);
          handleRecipeAction("delete", recipe);
        }}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={isDeleting}
        title={"Delete this recipe permanently?"}
        subtext={
          "This will delete the recipe along with its related ingredient information. Users who have saved it will no longer find it in their collections. Please note, This action cannot be undone."
        }
        actionBtn={"Yes, Remove"}
      />

      <PublishConfirmModal
        open={publishModalOpen}
        onClose={() => !isPublishing && setPublishModalOpen(false)}
        onConfirm={handlePublish}
        loading={isPublishing}
        title={"Ready to Publish this Recipe?"}
        subtext={
          "Publishing this recipe will make it visible to all users in the app. Please verify the ingredients, portions, and cooking steps before proceeding."
        }
        actionBtn={"Publish Now"}
      />

      <UnpublishConfirmModal
        open={unpublishModalOpen}
        onClose={() => !isUnpublishing && setUnpublishModalOpen(false)}
        onConfirm={handleUnpublish}
        loading={isUnpublishing}
        title={"Unpublish this recipe?"}
        subtext={
          "Unpublishing will hide this recipe from public access. It won't be deleted, so you can easily republish it whenever you want."
        }
        actionBtn={"Unpublish"}
      />

      {data && (
        <PaginationFooter
          currentPage={data.current_page}
          lastPage={data.last_page}
          onPageChange={setPage}
          onPrev={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => setPage((p) => Math.min(p + 1, data.last_page))}
        />
      )}
    </>
  );
};

export default Recipes;
