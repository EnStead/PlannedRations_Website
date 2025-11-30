import { useState } from 'react';
import Search from '../../../../assets/Search.svg'
import IngredientModal from '../../../../Utility/IngredientModal';
import ReusableTable from '../../../../Utility/ReusableTable'

const ingredientsData = [
{
    "Ingredients": "Tomatoes",
    "Category": "Vegetable",
    "Default Unit": "kg",
    "Used In": "Tomato Sauce",
},
{
    "Ingredients": "Flour",
    "Category": "Baking",
    "Default Unit": "kg",
    "Used In": "Bread",
},
{
    "Ingredients": "Sugar",
    "Category": "Sweetener",
    "Default Unit": "grams",
    "Used In": "Cakes",
},
{
    "Ingredients": "Olive Oil",
    "Category": "Oils",
    "Default Unit": "liters",
    "Used In": "Salads",
},
{
    "Ingredients": "Chicken Breast",
    "Category": "Protein",
    "Default Unit": "kg",
    "Used In": "Grilled Chicken",
},
];


const Ingredients = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
    const [selectedItem, setSelectedItem] = useState(null);

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


  return (
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
                        className="w-full px-4 py-2 pr-12 border bg-brand-carhead border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                    />

                    <img 
                        src={Search}
                        alt="search icon"
                        className="absolute right-4 top-[44%] -translate-y-1/2 w-4 cursor-pointer"
                    />

                </div>
  
                <button onClick={openAddModal} className=" cursor-pointer w-67 bg-brand-secondary text-white text-sm sm:text-base px-2 sm:px-10 py-2  rounded-2xl font-medium hover:opacity-90 transition">
                    Add Ingredient
                </button>
                
            </div>
        </div>
        <div className='mt-8'>
            <ReusableTable 
                columns={["Ingredients", "Category", "Default Unit", "Used In"]}
                data={ingredientsData}
                actions="editDelete"
                onEdit={openEditModal}
            />

        </div>

        <IngredientModal
            open={isModalOpen}
            mode={modalMode}
            initialValues={selectedItem}
            onClose={() => setIsModalOpen(false)}
            onSubmit={(data) => {
                if(modalMode === "add") {
                console.log("create", data);
                } else {
                console.log("update", data);
                }
                setIsModalOpen(false);
            }}
        />


    </section>
  )
}

export default Ingredients