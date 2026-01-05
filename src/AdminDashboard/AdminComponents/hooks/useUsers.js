import { useQuery } from "@tanstack/react-query";
import api from "../../../Utility/api";

const fetchUsers = async ({ queryKey }) => {
  const [_key, { page, search }] = queryKey;

  const res = await api.get("/admin/users", {
    params: {
      page,
      search: search || undefined,
    },
  });

  return res.data.data; // 👈 important
};

export const useUsers = ({ page, search }) => {
  return useQuery({
    queryKey: ["users", { page, search }],
    queryFn: fetchUsers,
    keepPreviousData: true,
  });
};
