import { useQuery } from "@tanstack/react-query";
import api from "../../../Utility/api";

const fetchTags = async ({ queryKey }) => {
  const [, page, search] = queryKey;

  const res = await api.get("/admin/tags", {
    params: {
      page,
      search: search || undefined,
    },
  });

  return res.data.data;
};

export const useTags = ({ page, search }) => {
  return useQuery({
    queryKey: ["tags", page, search],
    queryFn: fetchTags,
    keepPreviousData: true,
  });
};
