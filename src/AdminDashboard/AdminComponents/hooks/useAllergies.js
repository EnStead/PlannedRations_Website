import { useQuery } from "@tanstack/react-query";
import api from "../../../Utility/api";

const fetchAllergies = async ({ queryKey }) => {
  const [, page, search] = queryKey;

  const res = await api.get("/admin/allergies", {
    params: {
      page,
      search: search || undefined,
    },
  });

  return res.data.data;
};

export const useAllergies = ({ page, search }) => {
  return useQuery({
    queryKey: ["allergies", page, search],
    queryFn: fetchAllergies,
    keepPreviousData: true,
  });
};
