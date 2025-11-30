import { useState } from 'react';
import Search from '../../../../assets/Search.svg'
import ReusableTable from '../../../../Utility/ReusableTable'
import { useNavigate } from 'react-router-dom';



const recipesData = [
  {
    "Recipe Name": "Grilled Chicken Bowl",
    "Base Serving": 2,
    "Calories": "420 kcal",
    "Cooking Time": "24 mins",
    "Recipe Steps": 12,
    "Difficulty": "Medium",
    "Ratings": "4.5 star"
  },
  {
    "Recipe Name": "Mango Smoothie",
    "Base Serving": 4,
    "Calories": "190 kcal",
    "Cooking Time": "15 mins",
    "Recipe Steps": 5,
    "Difficulty": "Easy",
    "Ratings": "4.8 star"
  },
  {
    "Recipe Name": "Quinoa Salad",
    "Base Serving": 1,
    "Calories": "350 kcal",
    "Cooking Time": "10 mins",
    "Recipe Steps": 8,
    "Difficulty": "Easy",
    "Ratings": "4.7 star"
  },
  {
    "Recipe Name": "Beef Stir Fry",
    "Base Serving": 3,
    "Calories": "550 kcal",
    "Cooking Time": "20 mins",
    "Recipe Steps": 15,
    "Difficulty": "Medium",
    "Ratings": "4.6 star"
  },
  {
    "Recipe Name": "Avocado Toast",
    "Base Serving": 2,
    "Calories": "300 kcal",
    "Cooking Time": "5 mins",
    "Recipe Steps": 6,
    "Difficulty": "Easy",
    "Ratings": "4.9 star"
  },
  {
    "Recipe Name": "Veggie Burger",
    "Base Serving": 3,
    "Calories": "450 kcal",
    "Cooking Time": "25 mins",
    "Recipe Steps": 14,
    "Difficulty": "Medium",
    "Ratings": "4.4 star"
  },
  {
    "Recipe Name": "Chocolate Chip Pancakes",
    "Base Serving": 5,
    "Calories": "600 kcal",
    "Cooking Time": "30 mins",
    "Recipe Steps": 20,
    "Difficulty": "Hard",
    "Ratings": "4.2 star"
  },
  {
    "Recipe Name": "Caesar Salad",
    "Base Serving": 1,
    "Calories": "200 kcal",
    "Cooking Time": "10 mins",
    "Recipe Steps": 7,
    "Difficulty": "Easy",
    "Ratings": "4.5 star"
  },
  {
    "Recipe Name": "Spaghetti Carbonara",
    "Base Serving": 4,
    "Calories": "700 kcal",
    "Cooking Time": "35 mins",
    "Recipe Steps": 16,
    "Difficulty": "Hard",
    "Ratings": "4.1 star"
  },
  {
    "Recipe Name": "Fruit Parfait",
    "Base Serving": 2,
    "Calories": "150 kcal",
    "Cooking Time": "8 mins",
    "Recipe Steps": 4,
    "Difficulty": "Easy",
    "Ratings": "4.8 star"
  }
];

const draftData = [
  {
    "Recipe Name": "Grilled Chicken Bowl",
    "Base Serving": 2,
    "Calories": "420 kcal",
    "Cooking Time": "24 mins",
    "Recipe Steps": 12,
    "Difficulty": "Medium",
    "Last Saved": "Oct 23, 2025"
  },
  {
    "Recipe Name": "Mango Smoothie",
    "Base Serving": 4,
    "Calories": "190 kcal",
    "Cooking Time": "15 mins",
    "Recipe Steps": 5,
    "Difficulty": "Easy",
    "Last Saved": "Oct 23, 2025"
  },
  {
    "Recipe Name": "Quinoa Salad",
    "Base Serving": 1,
    "Calories": "350 kcal",
    "Cooking Time": "10 mins",
    "Recipe Steps": 8,
    "Difficulty": "Easy",
    "Last Saved": "Oct 23, 2025"
  },
  {
    "Recipe Name": "Beef Stir Fry",
    "Base Serving": 3,
    "Calories": "550 kcal",
    "Cooking Time": "20 mins",
    "Recipe Steps": 15,
    "Difficulty": "Medium",
    "Last Saved": "Oct 23, 2025"
  },
  {
    "Recipe Name": "Avocado Toast",
    "Base Serving": 2,
    "Calories": "300 kcal",
    "Cooking Time": "5 mins",
    "Recipe Steps": 6,
    "Difficulty": "Easy",
    "Last Saved": "Oct 23, 2025"
  },
  {
    "Recipe Name": "Veggie Burger",
    "Base Serving": 3,
    "Calories": "450 kcal",
    "Cooking Time": "25 mins",
    "Recipe Steps": 14,
    "Difficulty": "Medium",
    "Last Saved": "Oct 23, 2025"
  },
  {
    "Recipe Name": "Chocolate Chip Pancakes",
    "Base Serving": 5,
    "Calories": "600 kcal",
    "Cooking Time": "30 mins",
    "Recipe Steps": 20,
    "Difficulty": "Hard",
   "Last Saved": "Oct 23, 2025"
  },
  {
    "Recipe Name": "Caesar Salad",
    "Base Serving": 1,
    "Calories": "200 kcal",
    "Cooking Time": "10 mins",
    "Recipe Steps": 7,
    "Difficulty": "Easy",
    "Last Saved": "Oct 23, 2025"
  },
  {
    "Recipe Name": "Spaghetti Carbonara",
    "Base Serving": 4,
    "Calories": "700 kcal",
    "Cooking Time": "35 mins",
    "Recipe Steps": 16,
    "Difficulty": "Hard",
    "Last Saved": "Oct 23, 2025"
  },
  {
    "Recipe Name": "Fruit Parfait",
    "Base Serving": 2,
    "Calories": "150 kcal",
    "Cooking Time": "8 mins",
    "Recipe Steps": 4,
    "Difficulty": "Easy",
    "Last Saved": "Oct 23, 2025"
  }
];



const Recipes = () => {

    const [activeTab, setActiveTab] = useState("published");
    const navigate = useNavigate();

  return (
    <section className='bg-brand-background1 min-h-screen py-10 ' >
        <div className='flex justify-between items-center px-10' >
            <div>
                <h2 className='text-brand-cardhead font-medium text-xl mb-2 font-dash' >
                    Recipe Manager
                </h2>
                <p className='text-brand-subtext'>
                    Create, edit, or view recipes in the library
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
  
                <button onClick={() => navigate("add-recipe")} className=" cursor-pointer w-74 bg-brand-secondary text-white text-sm sm:text-base px-2 sm:px-10 py-2  rounded-2xl font-medium hover:opacity-90 transition">
                    Add New Recipe
                </button>
                
            </div>
        </div>

        <div className="flex max-w-sm gap-4 mt-6 px-10">
            
            <button
                onClick={() => setActiveTab("published")}
                className={`
                    flex-1 w-20 py-2 rounded-full transition font-medium
                    ${activeTab === "published" 
                        ? "bg-brand-secondary text-white" 
                        : "bg-transparent border border-brand-planoff text-brand-muted"}
                `}
            >
                Published
            </button>

            <button
                onClick={() => setActiveTab("drafts")}
                className={`
                    flex-1 py-2 rounded-full transition font-medium
                    ${activeTab === "drafts" 
                        ? "bg-brand-secondary text-white" 
                        : "bg-transparent border border-brand-planoff text-brand-muted"}
                `}
            >
                My Drafts
            </button>

        </div>


        <div className='mt-8 px-10'>
            {activeTab === "published" && (
                <ReusableTable 
                    columns={["Recipe Name", "Base Serving", "Calories", "Cooking Time", "Recipe Steps", "Difficulty", "Ratings"]}
                    data={recipesData}
                    actions="menu"
                    menuItems={[
                        { label: "View Recipe", action: "view" },
                        { label: "Edit Recipe", action: "edit" },
                        { label: "Unpublish Recipe", action: "unpublish" },
                        { label: "Delete Recipe", action: "delete", destructive: true },
                    ]}
                />

            )}

            {activeTab === "drafts" && (
                <ReusableTable 
                    columns={["Recipe Name", "Base Serving", "Calories", "Cooking Time", "Recipe Steps", "Difficulty", "Last Saved"]}
                    data={draftData}
                    actions="menu"
                    menuItems={[
                        { label: "Edit Recipe", action: "edit" },
                        { label: "Publish Recipe", action: "publish" },
                        { label: "Delete Recipe", action: "delete", destructive: true },
                    ]}
                />
            )}
        </div>

    </section>
  )
}

export default Recipes