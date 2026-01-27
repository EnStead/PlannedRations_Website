import ReusableTable from "../../../Utility/ReusableTable";
import PaginationFooter from "./PaginationFooter";
import TableSkeleton from "../../../Utility/skeletons/TableSkeleton";
import { useDashboard } from "../../Context/DashboardContext";
import { useUsers } from "../hooks/useUsers";
import { useState } from "react";
import SideModal from "./SlideModal";
import ResetPasswordModal from "./ResetPasswordModal";
import api from "../../../Utility/api";
import { useToast } from "../../Context/ToastProvider";
import UserDeleteModal from "../../../Utility/UserDeleteModal";

export const Spinner = () => (
  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

const Users = () => {
  const { showToast } = useToast();
  const { page, setPage, search, setSearch } = useDashboard();
  const { data, isLoading, isError, refetch } = useUsers({ page, search });
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleDeleteUser = async (deleteFamily) => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`/admin/delete-user/${userToDelete.id}`, {
        params: { delete_family: deleteFamily },
      });
      showToast({
        title: "Success",
        description: "User deleted successfully",
        variant: "success",
      });
      setDeleteModalOpen(false);
      setUserToDelete(null);
      refetch();
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete user",
        variant: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUserAction = (action, row) => {
    switch (action) {
      case "view":
        setSelectedUser(row);
        setUserDetailsOpen(true);
        break;

      case "reset":
        setSelectedUser(row);
        setResetModalOpen(true);
        break;

      case "delete":
        openDeleteModal(row);
        break;

      default:
        break;
    }
  };

  const generateCSV = (data) => {
    const headers = [
      "Name",
      "Email Address",
      "Plan Type",
      "Duration",
      "Joined On",
    ];

    const rows = data.map((user) => {
      const map = {
        planned_rations_monthly: "Monthly",
        planned_rations_quarterly: "Quarterly",
        planned_rations_annually: "Annualy/Premium",
        planned_rations_family_monthly: "Family",
      };
      const duration = map[user.plan_code] || user.plan_code;
      const joined = user.created_at
        ? new Date(user.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        : "";

      return [user.name, user.email, user.plan_name, duration, joined]
        .map((e) => `"${String(e || "").replace(/"/g, '""')}"`)
        .join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAllUsersToCSV = async () => {
    setIsDownloading(true);
    try {
      let allUsers = [];
      let currentPage = 1;
      let lastPage = 1;

      do {
        const res = await api.get("/admin/users", {
          params: { page: currentPage, search: search || "" },
        });

        const users = res.data?.data || [];
        allUsers = [...allUsers, ...users];
        lastPage = res.data?.last_page || 1;
        currentPage++;
      } while (currentPage <= lastPage);

      // build CSV from allUsers
      generateCSV(allUsers);
    } catch (err) {
       console.error(err);
      showToast({
        title: "Error",
        description: "Failed to export all users",
        variant: "error",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading)
    return (
      <div className="p-10">
        <TableSkeleton />
      </div>
    );
  if (isError) return <p className="p-10">Failed to load users</p>;

  return (
    <>
      <section className="bg-brand-background1 min-h-screen pt-10 ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-10 gap-4">
          <div>
            <h2 className="text-brand-cardhead font-dash font-medium text-xl mb-2">
              User Overview
            </h2>
            <p className="text-brand-subtext">
              Manage individual accounts and family groups.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row w-full md:w-auto justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search by name, email adress"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 pr-12 border bg-brand-carhead border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              />
            </div>

            <button
              onClick={exportAllUsersToCSV}
              disabled={isDownloading}
              className={`cursor-pointer w-full sm:w-auto bg-brand-secondary text-white text-sm sm:text-base px-6 py-2  rounded-2xl font-medium hover:opacity-90 transition whitespace-nowrap ${
                isDownloading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isDownloading ? (
                <span className="flex items-center gap-2">
                  <Spinner /> Exporting...
                </span>
              ) : (
                "Export as CSV"
              )}
            </button>
          </div>
        </div>
        <div className="mt-8">
          <ReusableTable
            columns={[
              {
                label: "Name",
                accessor: "name",
                className: "font-medium text-brand-cardhead",
              },
              {
                label: "Email Address",
                accessor: "email",
              },
              {
                label: "Plan Type",
                accessor: "plan_name",
                className: "capitalize",
              },
              {
                label: "Duration",
                accessor: "plan_code",
                className: "capitalize",
                render: (value) => {
                  const map = {
                    planned_rations_monthly: "Monthly",
                    planned_rations_quarterly: "Quarterly",
                    planned_rations_annually: "Annualy/Premium",
                    planned_rations_family_monthly: "Family",
                  };
                  return map[value] || value;
                },
              },
              {
                label: "Joined On",
                accessor: "created_at",
                render: (value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }),
              },
            ]}
            data={data?.data}
            actions="menu"
            menuItems={[
              { label: "View Details", action: "view" },
              { label: "Reset Password", action: "reset" },
              { label: "Delete Account", action: "delete", destructive: true },
            ]}
            onAction={handleUserAction}
          />
        </div>
      </section>

      <SideModal
        open={userDetailsOpen}
        onOpenChange={setUserDetailsOpen}
        title="User Details"
        selectedRow={selectedUser}
        onReset={() => {
          setUserDetailsOpen(false);
          handleUserAction("reset", selectedUser);
        }}
        onDelete={() => {
          setUserDetailsOpen(false);
          handleUserAction("delete", selectedUser);
        }}
      />

      <ResetPasswordModal
        open={resetModalOpen}
        onOpenChange={setResetModalOpen}
        user={selectedUser}
      />

      <UserDeleteModal
        open={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        loading={isDeleting}
        title="Delete this account permanently?"
        subtext="Deleting this account will erase all user data, such as meal logs, goals, and family syncs (if any). This action cannot be undone."
        isFamily={userToDelete?.is_family}
      />

      {/* Pagination */}
      <PaginationFooter
        page={data.current_page}
        lastPage={data.last_page}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, data.last_page))}
      />
    </>
  );
};

export default Users;
