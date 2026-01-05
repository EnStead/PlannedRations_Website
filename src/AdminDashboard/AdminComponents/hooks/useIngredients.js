import { useQuery } from "@tanstack/react-query";
import api from "../../../Utility/api";

const fetchIngredients = async ({ queryKey }) => {
  const [, page, search] = queryKey;

  const res = await api.get("/admin/ingredients", {
    params: {
      page,
      q: search || undefined,
    },
  });

  return res.data.data;
};

export const useIngredients = ({ page, search }) => {
  return useQuery({
    queryKey: ["ingredients", page, search],
    queryFn: fetchIngredients,
    keepPreviousData: true,
  });
};
