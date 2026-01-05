// hooks/usePosts.js
import { useQuery } from "@tanstack/react-query";
import api from "../../../Utility/api";

const fetchPosts = async ({ queryKey }) => {
  const [, tab, page, search] = queryKey;

  const endpoint =
    tab === "published" ? "/admin/published-posts" : "/admin/draft-posts";

  const res = await api.get(endpoint, {
    params: {
      page,
      q: search || undefined,
    },
  });

  return res.data.data; // adjust if your API nests data differently
};

export const usePosts = ({ tab, page, search }) => {
  return useQuery({
    queryKey: ["posts", tab, page, search],
    queryFn: fetchPosts,
    keepPreviousData: true,
  });
};
