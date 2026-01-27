import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../../Utility/ReusableTable";
import { usePosts } from "../hooks/usePosts";
import PaginationFooter from "./PaginationFooter";
import api from "../../../Utility/api";
import { useToast } from "../../Context/ToastProvider";
import PublishConfirmModal from "../../../Utility/PublishConfirmModal";
import DeleteConfirmModal from "../../../Utility/DeleteConfirmModal";
import UnpublishConfirmModal from "../../../Utility/UnpublishConfirmModal";
import { useDashboard } from "../../Context/DashboardContext";

const Posts = () => {
  const [activeTab, setActiveTab] = useState("published");
  const { page, setPage, search, setSearch } = useDashboard();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedPost, setSelectedPost] = useState(null);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handlePublish = async () => {
    if (!selectedPost) return;
    setIsSubmitting(true);
    try {
      const res = await api.put(`/admin/publish-post/${selectedPost.id}`);
      showToast({
        title: "Success",
        description: res.data.message || "Post published successfully",
        variant: "success",
      });
      setPublishModalOpen(false);
      refetch();
    } catch (error) {
      showToast({
        title: "Error",
        description: error.response?.data?.message || "Failed to publish post",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArchive = async () => {
    if (!selectedPost) return;
    setIsSubmitting(true);
    try {
      const res = await api.put(`/admin/archive-post/${selectedPost.id}`);
      showToast({
        title: "Success",
        description: res.data.message || "Post archived successfully",
        variant: "success",
      });
      setArchiveModalOpen(false);
      refetch();
    } catch (error) {
      showToast({
        title: "Error",
        description: error.response?.data?.message || "Failed to archive post",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    setIsSubmitting(true);
    try {
      await api.delete(`/admin/delete-post/${selectedPost.id}`);
      showToast({
        title: "Success",
        description: "Post deleted successfully",
        variant: "success",
      });
      setDeleteModalOpen(false);
      refetch();
    } catch (error) {
      showToast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete post",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostAction = (action, post) => {
    setSelectedPost(post);
    if (action === "publish") setPublishModalOpen(true);
    if (action === "draft") setArchiveModalOpen(true); // "draft" action maps to Archive
    if (action === "delete") setDeleteModalOpen(true);
    if (action === "edit") navigate(`edit/${post.id}`);
    if (action === "preview") window.open(`/blog/${post.id}`, "_blank");
  };

  return (
    <>
      <section className="bg-brand-background1 min-h-screen py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-10 gap-4">
          <div>
            <h2 className="text-brand-cardhead font-medium text-xl mb-2 font-dash">
              Content Hub
            </h2>
            <p className="text-brand-subtext">
              Create and manage posts across the app and website.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row w-full md:w-auto justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search by title"
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
              className="cursor-pointer w-full sm:w-auto bg-brand-secondary text-white text-sm sm:text-base px-6 py-2 rounded-2xl font-medium hover:opacity-90 transition whitespace-nowrap"
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
          className="flex flex-col mt-6 px-4 sm:px-10"
        >
          <Tabs.List className="flex max-w-sm gap-4">
            <Tabs.Trigger
              value="published"
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                activeTab === "published"
                  ? "bg-brand-secondary text-white"
                  : "bg-transparent border border-brand-planoff text-brand-muted"
              }`}
            >
              Published
            </Tabs.Trigger>

            <Tabs.Trigger
              value="drafts"
              className={`flex-1 py-2 rounded-lg font-medium transition ${
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
                      label: "Tags",
                      accessor: "tags",
                      className: "capitalize",
                      render: (tags) =>
                        Array.isArray(tags)
                          ? tags.map((t) => t.title).join(", ")
                          : "-",
                    },
                    {
                      label: "Post Type",
                      accessor: "type",
                      className: "capitalize",
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
                    {
                      label: "Delete Post",
                      action: "delete",
                      destructive: true,
                    },
                  ]}
                  onAction={handlePostAction}
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
                      label: "Tags",
                      accessor: "tags",
                      className: "capitalize",
                      render: (tags) =>
                        Array.isArray(tags)
                          ? tags.map((t) => t.title).join(", ")
                          : "-",
                    },
                    {
                      label: "Post Type",
                      accessor: "type",
                      className: "capitalize",
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
                    {
                      label: "Delete Post",
                      action: "delete",
                      destructive: true,
                    },
                  ]}
                  onAction={handlePostAction}
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

      <PublishConfirmModal
        open={publishModalOpen}
        onClose={() => !isSubmitting && setPublishModalOpen(false)}
        onConfirm={handlePublish}
        loading={isSubmitting}
        title="Publish this Post?"
        subtext="After publication, this post will be featured on the Blog page of website. Ensure that the title, category, and thumbnail are set correctly."
        actionBtn="Publish Post"
      />

      <UnpublishConfirmModal
        open={archiveModalOpen}
        onClose={() => !isSubmitting && setArchiveModalOpen(false)}
        onConfirm={handleArchive}
        loading={isSubmitting}
        title="Move this Post to Draft?"
        subtext="This will hide this post from users while retaining it in your drafts for editing or potential re-publication."
        actionBtn="Move to Draft"
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => !isSubmitting && setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={isSubmitting}
        title="Delete this Post?"
        subtext="This action will permanently delete the article from where it was published. Any internal links to it will no longer work and leads to “Not Found”."
        actionBtn="Delete Post"
      />
    </>
  );
};

export default Posts;
