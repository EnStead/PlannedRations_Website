import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../../Utility/ReusableTable";
import { useRecipe } from "../hooks/useRecipe";
import PaginationFooter from "./PaginationFooter";
import RecipeDetailsSlideModal from "./RecipeDetailsSlideModal";

 


const Recipes = () => {

  const [activeTab, setActiveTab] = useState("published");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeDetailsOpen, setRecipeDetailsOpen] = useState(false);

  const handleRecipeAction = (action, recipe) => {
    switch (action) {
      case "view":
        setSelectedRecipe(recipe);
        setRecipeDetailsOpen(true);
        break;

      case "edit":
        navigate(`edit-recipe/${recipe.id}`);
        break;

      case "publish":
        publishRecipe(recipe.id);
        break;

      case "unpublish":
        unpublishRecipe(recipe.id);
        break;

      case "delete":
        setSelectedRecipe(recipe);
        setDeleteModalOpen(true);
        break;

      default:
        break;
    }
  };


  const { data, isLoading, isError, refetch } = useRecipe({
    tab: activeTab,
    page,
    search,
  });

  const recipes = data?.data ?? []; 

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
        <div className="flex justify-between items-center px-10">
          <div>
            <h2 className="text-brand-cardhead font-medium text-xl mb-2 font-dash">
              Recipe Manager
            </h2>
            <p className="text-brand-subtext">
              Create, edit, or view recipes in the library
            </p>
          </div>

          <div className="mt-8 flex justify-between items-center gap-4">
            <div className="relative w-full max-w-md">
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
              className="cursor-pointer w-74 bg-brand-secondary text-white text-sm sm:text-base px-2 sm:px-10 py-2 rounded-2xl font-medium hover:opacity-90 transition"
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
          className="flex flex-col mt-6 px-10"
        >
          <Tabs.List className="flex max-w-sm gap-4">
            <Tabs.Trigger
              value="published"
              className={`flex-1 py-2 rounded-full font-medium transition ${
                activeTab === "published"
                  ? "bg-brand-secondary text-white"
                  : "bg-transparent border border-brand-planoff text-brand-muted"
              }`}
            >
              Published
            </Tabs.Trigger>

            <Tabs.Trigger
              value="drafts"
              className={`flex-1 py-2 rounded-full font-medium transition ${
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
                        render: (value) => value ? `${value} kcal` : "—",
                        },  
                        {
                          label: "Cooking Time",
                          accessor: "cooking_time",                          
                          render: (value) => value ? `${value} min` : "—",
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
                          render: (value) => value ? `${value} star` : "—",
                        },
                    ]}
                  data={activeTab === "published" ? recipes : []}
                  actions="menu"
                  menuItems={[
                    { label: "View Recipe", action: "view" },
                    { label: "Edit Recipe", action: "edit" },
                    { label: "Unpublish Recipe", action: "unpublish" },
                    { label: "Delete Recipe", action: "delete", destructive: true },
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
                        render: (value) => value ? `${value} kcal` : "—",
                        },  
                        {
                          label: "Cooking Time",
                          accessor: "cooking_time",                          
                          render: (value) => value ? `${value} min` : "—",
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
                    { label: "Delete Recipe", action: "delete", destructive: true },
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
        recipe={selectedRecipe}
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
  )
}

export default Recipes