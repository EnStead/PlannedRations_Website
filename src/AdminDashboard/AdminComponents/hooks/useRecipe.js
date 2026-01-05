import { useQuery } from "@tanstack/react-query";
import api from "../../../Utility/api";

const fetchRecipes = async ({ queryKey }) => {
  const [, tab, page, search] = queryKey;

  const endpoint =
    tab === "published" ? "/admin/recipes/published" : "/admin/recipes/drafts";

  const res = await api.get(endpoint, {
    params: {
      page,
      q: search || undefined,
    },
  });

  return res.data.data; // adjust if your API nests data differently
};

export const useRecipe = ({ tab, page, search }) => {
  return useQuery({
    queryKey: ["recipes", tab, page, search],
    queryFn: fetchRecipes,
    keepPreviousData: true,
  });
};
