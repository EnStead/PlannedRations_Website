import { useQuery } from "@tanstack/react-query";
import api from "../../../Utility/api";

const fetchIngredients = async ({ queryKey }) => {
  const [, page, search, sortBy, sortDirection, perPage] = queryKey;

  const res = await api.get("/admin/ingredients", {
    params: {
      page,
      per_page: perPage,
      q: search || undefined,
      sort_by: sortBy || undefined,
      sort_direction: sortDirection || undefined,
    },
  });

  return res.data.data;
};

export const useIngredients = ({
  page,
  search,
  sortBy,
  sortDirection,
  perPage = 10,
}) => {
  return useQuery({
    queryKey: ["ingredients", page, search, sortBy, sortDirection, perPage],
    queryFn: fetchIngredients,
    keepPreviousData: true,
  });
};
