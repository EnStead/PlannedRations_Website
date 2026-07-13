import { useQuery } from "@tanstack/react-query";
import api from "../../../Utility/api";

const fetchRecipes = async ({ queryKey }) => {
  const [, tab, page, search, sortBy, sortDirection, perPage] = queryKey;

  const endpoint =
    tab === "published" ? "/admin/recipes/published" : "/admin/recipes/drafts";

  const res = await api.get(endpoint, {
    params: {
      page,
      per_page: perPage,
      q: search || undefined,
      sort_by: sortBy || undefined,
      sort_direction: sortDirection || undefined,
    },
  });

  return res.data.data; // adjust if your API nests data differently
};

export const useRecipe = ({
  tab,
  page,
  search,
  sortBy,
  sortDirection,
  perPage = 10,
}) => {
  return useQuery({
    queryKey: ["recipes", tab, page, search, sortBy, sortDirection, perPage],
    queryFn: fetchRecipes,
    keepPreviousData: true,
  });
};
