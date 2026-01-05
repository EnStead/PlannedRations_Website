import { useState } from 'react';
import Search from '../../../assets/Search.svg'
import IngredientModal from '../../../Utility/IngredientModal';
import ReusableTable from '../../../Utility/ReusableTable'
import { useIngredients } from '../hooks/useIngredients';
import TableSkeleton from '../../../Utility/skeletons/TableSkeleton';
import PaginationFooter from './PaginationFooter';
import api from '../../../Utility/api';
import { useDashboard } from '../../Context/DashboardContext';
import DeleteConfirmModal from '../../../Utility/DeleteConfirmModal';


const Ingredients = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add"); 
    const [selectedItem, setSelectedItem] = useState(null); 
    const { page, setPage, search, setSearch } = useDashboard();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [ingredientToDelete, setIngredientToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);



  const {
    data,
    isLoading,
    isError,
    refetch
  } = useIngredients({ page, search });

  const ingredients = data?.data ?? [];

    const openAddModal = () => {
        setModalMode("add");
        setSelectedItem(null);
        setIsModalOpen(true);
    };

    const openEditModal = (row) => {
    setModalMode("edit");
    setSelectedItem(row);
    setIsModalOpen(true);
    };


    const handleSubmit = async (form) => {
        try {
            setIsSubmitting(true);

            if (modalMode === "add") {
            await api.post("/admin/ingredients", form);
            } else {
            await api.put(`/admin/ingredients/${selectedItem.id}`, form);
            }

            setIsModalOpen(false);
            refetch();
        } finally {
            setIsSubmitting(false);
        }
    };

    const openDeleteModal = (row) => {
    setIngredientToDelete(row);
    setDeleteModalOpen(true);
    };


    const handleDelete = async () => {
    if (!ingredientToDelete) return;

    try {
        setIsDeleting(true);

        await api.delete(`/admin/ingredients/${ingredientToDelete.id}`);

        setDeleteModalOpen(false);
        setIngredientToDelete(null);

        refetch();
    } catch (err) {
        console.error("Failed to delete ingredient", err);
    } finally {
        setIsDeleting(false);
    }
    };



    {isLoading && (
        <TableSkeleton/>
    )}

    {!isLoading && ingredients.length === 0 && (
        <p className="text-center text-brand-subtext py-10">
            No ingredients found.
        </p>
    )}

    if (isError) return <p className="p-10">Failed to load users</p>;



  return (
    <>
        <section className='bg-brand-background1 min-h-screen py-10 ' >
            <div className='flex justify-between items-center px-10' >
                <div>
                    <h2 className='text-brand-cardhead font-medium text-xl mb-2' >
                        Ingredients Library
                    </h2>
                    <p className='text-brand-subtext'>
                        Ingredients Library Manage reusable Ingredients linked across recipes.
                    </p>
                </div>
                <div className="mt-8 flex justify-between items-center gap-4" >                        
                    {/* Search Bar */}
                    <div className="relative w-full max-w-md">
                    
                    <input
                    type="text"
                    placeholder="Search ingredient..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1); // reset pagination on search
                    }}
                    className="w-full px-4 py-2 pr-12 border bg-brand-carhead border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                    />
                    </div>
    
                    <button onClick={openAddModal} className=" cursor-pointer w-67 bg-brand-secondary text-white text-sm sm:text-base px-2 sm:px-10 py-2  rounded-2xl font-medium hover:opacity-90 transition">
                        Add Ingredient
                    </button>
                    
                </div>
            </div>
            <div className='mt-8'>
                <ReusableTable
                    columns={[
                        {
                        label: "Ingredient",
                        accessor: "name",
                        className: "font-medium text-brand-cardhead",
                        },
                        {
                        label: "Category",
                        accessor: "category",
                        },
                        {
                        label: "Default Unit",
                        accessor: "default_unit",
                        },
                        {
                        label: "Used In",
                        accessor: "recipes_count",
                        render: (value) => `${value} recipe${value !== 1 ? "s" : ""}`,
                        },
                    ]}
                    data={ingredients}
                    actions="editDelete"
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}

                />

            </div>

            <IngredientModal
                open={isModalOpen}
                mode={modalMode}
                initialValues={selectedItem}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                loading={isSubmitting}
            />


            <DeleteConfirmModal
                open={deleteModalOpen}
                onClose={() => !isDeleting && setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                loading={isDeleting}
            />


                

        </section>
        
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
  )
}

export default Ingredients