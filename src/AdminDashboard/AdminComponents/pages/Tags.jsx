import { useState } from "react";
import { useDashboard } from "../../Context/DashboardContext";
import { useTags } from "../hooks/useTags";
import ReusableTable from "../../../Utility/ReusableTable";
import TableSkeleton from "../../../Utility/skeletons/TableSkeleton";
import TagSideModal from "./TagSideModal";
import AddTagModal from "./AddTagModal";
import PaginationFooter from "./PaginationFooter";
import DeleteConfirmModal from "../../../Utility/DeleteConfirmModal";
import api from "../../../Utility/api";
import { useToast } from "../../Context/ToastProvider";

const Tags = () => {
  const { page, setPage, search, setSearch } = useDashboard();
  const { showToast } = useToast();
  const { data, isLoading, isError, refetch } = useTags({ page, search });
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagDetailsOpen, setTagDetailsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const users = data?.data ?? [];

  const openAddModal = (tag) => {
    setModalMode("add");
    setSelectedTag(tag);
    setSelectedTagId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tag) => {
    setModalMode("edit");
    setSelectedTag(tag);
    setSelectedTagId(tag.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      setIsSubmitting(true);

      let response;
      if (modalMode === "add") {
        response = await api.post("/admin/tags", form);
      } else {
        response = await api.put(`/admin/tags/${selectedTagId}`, form);
      }

      showToast({
        title: "Success",
        description:
          response.data.message ||
          (modalMode === "add"
            ? "Tag created successfully"
            : "Tag updated successfully"),
        variant: "success",
      });

      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save tag",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagAction = (action, tag) => {
    switch (action) {
      case "edit":
        openEditModal(tag);
        break;

      case "view":
        setSelectedTagId(tag.id);
        setTagDetailsOpen(true);
        break;

      case "delete":
        setSelectedTag(tag);
        setDeleteModalOpen(true);
        break;

      default:
        break;
    }
  };

  const handleDelete = async () => {
    if (!selectedTag) return;

    try {
      setIsDeleting(true);
      const response = await api.delete(`/admin/tags/${selectedTag.id}`);

      showToast({
        title: "Success",
        description: response.data.message || "Deleted Succesfully",
        variant: "success",
      });

      refetch(); // update the table
      setDeleteModalOpen(false); // close the modal
      setSelectedTag(null); // clear selection
    } catch (err) {
      console.error(err);
      showToast({
        title: "Error",
        description: "Failed to delete recipe",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isError) return <p className="p-10">Failed to load tags</p>;

  return (
    <>
      <section className="bg-brand-background1 min-h-screen py-10 ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-10 gap-4">
          <div>
            <h2 className="text-brand-cardhead font-medium text-xl mb-2">
              Tags & Targeting
            </h2>
            <p className="text-brand-subtext">
              Manage tags to personalize contents, recipes and challenges for
              different user needs.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row w-full md:w-auto justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search tags or category..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // reset pagination on search
                }}
                className="w-full px-4 py-2 pr-12 border bg-brand-carhead border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              />
            </div>

            <button
              onClick={openAddModal}
              className=" cursor-pointer w-full sm:w-auto font-bold bg-brand-secondary text-white text-sm sm:text-base px-6 py-2  rounded-2xl hover:opacity-90 transition whitespace-nowrap"
            >
              Create Tag
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="p-10">
            <TableSkeleton />
          </div>
        ) : (
          <div className="mt-8">
            <ReusableTable
              columns={[
                {
                  label: "Tag Title",
                  accessor: "title",
                  className: "font-medium text-brand-cardhead",
                },
                {
                  label: "Morality",
                  accessor: "good_for",
                  render: (value) =>
                    String(value) === "1" || String(value) === "true"
                      ? "Is good for"
                      : "Is bad for",
                },
                {
                  label: "Category",
                  accessor: "category",
                },
                {
                  label: "Sub-category/Type",
                  accessor: "sub_category",
                },
                {
                  label: "Usage",
                  accessor: "usage_label",
                },
              ]}
              data={users}
              actions="menu"
              menuItems={[
                { label: "Edit Tag", action: "edit" },
                { label: "View Usage", action: "view" },
                { label: "Delete Tag", action: "delete", destructive: true },
              ]}
              onAction={handleTagAction}
            />
          </div>
        )}
      </section>
      <AddTagModal
        open={isModalOpen}
        mode={modalMode}
        initialValues={selectedTag}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        loading={isSubmitting}
      />

      <TagSideModal
        open={tagDetailsOpen}
        onOpenChange={setTagDetailsOpen}
        tag={selectedTagId}
        onEdit={(tagData) => {
          setTagDetailsOpen(false);
          openEditModal(tagData);
        }}
        onDelete={(tagData) => {
          setTagDetailsOpen(false);
          handleTagAction("delete", tagData);
        }}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={isDeleting}
        title={"Delete Tag"}
        subtext={
          "Are you certain you want to delete these tags from the system? All content linked to these tags will be dissociated."
        }
        actionBtn={"Delete Tag"}
      />

      {data && (
        <PaginationFooter
          currentPage={data.current_page}
          lastPage={data.last_page}
          onPageChange={(page) => setPage(page)}
          onPrev={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => setPage((p) => Math.min(p + 1, data.last_page))}
        />
      )}
    </>
  );
};

export default Tags;
