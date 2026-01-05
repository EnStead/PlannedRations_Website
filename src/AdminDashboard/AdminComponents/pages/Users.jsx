import ReusableTable from '../../../Utility/ReusableTable'
import PaginationFooter from './PaginationFooter'
import TableSkeleton from '../../../Utility/skeletons/TableSkeleton';
import { useDashboard } from '../../Context/DashboardContext';
import { useUsers } from '../hooks/useUsers';
import { useState } from 'react';
import SideModal from './SlideModal';
import ResetPasswordModal from './ResetPasswordModal';


const Users = () => {
  const { page, setPage, search, setSearch } = useDashboard();
  const { data, isLoading, isError } = useUsers({ page, search });
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

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


  if (isLoading) return <div className="p-10">
    <TableSkeleton/>
  </div>;
  if (isError) return <p className="p-10">Failed to load users</p>;

  return (
    <>
      <section className='bg-brand-background1 min-h-screen pt-10 ' >
        <div className='flex justify-between items-center px-10' >
            <div>
                <h2 className='text-brand-cardhead font-dash font-medium text-xl mb-2' >
                  User Overview
                </h2>
                <p className='text-brand-subtext'>
                  Manage individual accounts and family groups.
                </p>
            </div>
            <div className="mt-8 flex justify-between items-center gap-4" >                        
                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                
                    <input
                      type="text"
                      placeholder="Search by name, email adress"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)} 
                      className="w-full px-4 py-2 pr-12 border bg-brand-carhead border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                    />
                </div>

                <button className=" cursor-pointer w-67 bg-brand-secondary text-white text-sm sm:text-base px-2 sm:px-10 py-2  rounded-2xl font-medium hover:opacity-90 transition">
                  Export as CSV
                </button>
                
            </div>
        </div>
        <div className='mt-8'>
          <ReusableTable
            columns = {[
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
            selectedRow = {selectedUser}
        />

        <ResetPasswordModal
            open={resetModalOpen}
            onOpenChange={setResetModalOpen}
            user={selectedUser}
        />


      {/* Pagination */}
      <PaginationFooter
        page={data.current_page}
        lastPage={data.last_page}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, data.last_page))}
      />

      
    
    </>
  )
}

export default Users