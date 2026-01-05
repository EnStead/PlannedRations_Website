import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../../Utility/ReusableTable";
import { usePosts } from "../hooks/usePosts";
import PaginationFooter from "./PaginationFooter";

const Posts = () => {
  const [activeTab, setActiveTab] = useState("published");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = usePosts({
    tab: activeTab,
    page,
    search,
  });

  const posts = data?.data ?? []; 

  const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
  }).format(date);
  };

  const formatViews = (num) => {
  if (num < 1000) return num;
  if (num < 1000000) return (num / 1000).toFixed(1) + "k";
  return (num / 1000000).toFixed(1) + "M";
  };

  return (
    <>
      <section className="bg-brand-background1 min-h-screen py-10">
        <div className="flex justify-between items-center px-10">
          <div>
            <h2 className="text-brand-cardhead font-medium text-xl mb-2 font-dash">
              Content Hub
            </h2>
            <p className="text-brand-subtext">
              Create and manage posts across the app and website.
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
              onClick={() => navigate("create")}
              className="cursor-pointer w-74 bg-brand-secondary text-white text-sm sm:text-base px-2 sm:px-10 py-2 rounded-2xl font-medium hover:opacity-90 transition"
            >
              Add New Post
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
              Failed to load posts.
            </div>
          ) : posts.length === 0 ? (
            <div className="mt-4 text-center text-brand-subtext">
              No posts found.
            </div>
          ) : (
            <>
              <Tabs.Content value="published" className="mt-4">
                <ReusableTable
                
                    columns={[
                        {
                        label: "Blog Title",
                        accessor: "title",
                        className: "font-medium text-brand-cardhead",
                        },
                        {
                        label: "Category",
                        accessor: "category",
                        },
                        {
                        label: "Post Type",
                        accessor: "type",
                        },  
                        {
                            label: "Published Date",
                            accessor: "published_at",
                            render: (value) => formatDate(value),
                        },
                        {
                            label: "Views",
                            accessor: "total_read",
                            render: (value) => formatViews(value),
                        },
                    ]}
                  data={activeTab === "published" ? posts : []}
                  actions="menu"
                  menuItems={[
                    { label: "Preview", action: "preview" },
                    { label: "Edit Post", action: "edit" },
                    { label: "Archive", action: "draft" },
                    { label: "Delete Post", action: "delete", destructive: true },
                  ]}
                />
              </Tabs.Content>

              <Tabs.Content value="drafts" className="mt-4">
                <ReusableTable
                    columns={[
                        {
                        label: "Blog Title",
                        accessor: "title",
                        className: "font-medium text-brand-cardhead",
                        },
                        {
                        label: "Category",
                        accessor: "category",
                        },
                        {
                        label: "Post Type",
                        accessor: "type",
                        },
                        {
                        label: "Last Saved",
                        accessor: "updated_at",
                        render: (value) => formatDate(value),
                        },
                    ]}
                  data={activeTab === "drafts" ? posts : []}
                  actions="menu"
                  menuItems={[
                    { label: "Edit Post", action: "edit" },
                    { label: "Publish Post", action: "publish" },
                    { label: "Delete Post", action: "delete", destructive: true },
                  ]}
                />
              </Tabs.Content>
            </>
          )}
        </Tabs.Root>

      </section>
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

export default Posts;
