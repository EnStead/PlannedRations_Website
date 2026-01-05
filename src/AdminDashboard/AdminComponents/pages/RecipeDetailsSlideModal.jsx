import React, { useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { X, MoreVertical } from "lucide-react";

const RecipeDetailsSlideModal = ({ open, onOpenChange, recipe }) => {
  const [activeTab, setActiveTab] = useState("nutritional");

  // Sample recipe data - replace with your actual recipe prop
  const defaultRecipe = {
    image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    name: "Spaghetti Bolognese",
    description: "A hearty dish of spaghetti topped with a rich, savory bolognese sauce made from ground beef, tomatoes, and aromatic herbs.",
    servings: 5,
    calories: 302,
    cooking_time: 30,
    nutritional_values: {
      protein: 26,
      carbohydrates: 43,
      fats: 13,
      fiber: 2.5,
      water_content: 92,
      potassium: 340,
      calcium: 120,
      vitamin_c: 60,
      iron: 2.1,
      magnesium: 30
    },
    ingredients: [
      "500g spaghetti pasta",
      "400g ground beef",
      "2 cans crushed tomatoes",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "2 tbsp olive oil",
      "1 tsp dried oregano",
      "1 tsp dried basil",
      "Salt and pepper to taste",
      "Fresh basil for garnish",
      "Parmesan cheese, grated"
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
      "In a large skillet, heat olive oil over medium heat. Add diced onion and cook until softened, about 5 minutes.",
      "Add minced garlic and cook for 1 minute until fragrant.",
      "Add ground beef and cook until browned, breaking it up with a wooden spoon, about 8-10 minutes.",
      "Stir in crushed tomatoes, oregano, basil, salt, and pepper. Simmer for 15-20 minutes.",
      "Drain the cooked spaghetti and add it to the sauce, tossing to combine.",
      "Serve hot, garnished with fresh basil and grated Parmesan cheese."
    ]
  };

  const handleEdit = () => {
    console.log("Edit recipe");
    // Add your edit logic here
  };

  const handleUnpublish = () => {
    console.log("Unpublish recipe");
    // Add your unpublish logic here
  };

  const handleDelete = () => {
    console.log("Delete recipe");
    // Add your delete logic here
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />

        {/* Modal Content */}
        <Dialog.Content className="fixed z-50 top-0 right-0 h-full w-[400px] hide-scrollbar transform  bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-white relative rounded-lg shadow-lg border border-gray-200 p-2 min-w-[160px] z-100">
                  <DropdownMenu.Item 
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer outline-none"
                    onSelect={handleEdit}
                  >
                    Edit Recipe
                  </DropdownMenu.Item>
                  <DropdownMenu.Item 
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer outline-none"
                    onSelect={handleUnpublish}
                  >
                    Unpublish Recipe
                  </DropdownMenu.Item>
                  <DropdownMenu.Item 
                    className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer outline-none"
                    onSelect={handleDelete}
                  >
                    Delete Recipe
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <Dialog.Title className="text-lg font-semibold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
              Recipe Details
            </Dialog.Title>

            <Dialog.Close asChild>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>
            <Dialog.Description>
                
            </Dialog.Description>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1">
            {/* Recipe Image */}
            <div className="px-6 pt-4">
              <img 
                src={defaultRecipe.image_url} 
                alt={defaultRecipe.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            {/* Recipe Info */}
            <div className="px-6 py-4">
              <h2 className="text-xl font-medium text-brand-primary font-dash mb-2">
                {defaultRecipe.name}
              </h2>
              <p className="text-sm text-brand-subtext font-light">
                {defaultRecipe.description}
              </p>
            </div>

            {/* Stats */}
            <div className="px-6 pb-4 flex items-center justify-between text-brand-subtext">
              <div className="text-center">
                <p className="font-medium ">{defaultRecipe.servings}</p>
                <p className="text-xs ">Base Servings</p>
              </div>
              <div className="text-center">
                <p className="font-medium">{defaultRecipe.calories} kcal</p>
                <p className="text-xs">Calories</p>
              </div>
              <div className="text-center">
                <p className=" font-medium">{defaultRecipe.cooking_time} mins</p>
                <p className="text-xs">Cooking Time</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="px-6">
              <Tabs.List className="flex justify-between gap-2 ">
                <Tabs.Trigger
                  value="nutritional"
                  className={`px-2 py-2 text-xs font-medium rounded-lg transition-colors outline-none ${
                    activeTab === "nutritional"
                      ? "bg-brand-purpbg text-white"
                      : "text-brand-muted hover:text-gray-900"
                  }`}
                >
                  Nutritional Value
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="ingredients"
                  className={`px-2 py-2 text-sm font-medium rounded-lg transition-colors outline-none ${
                    activeTab === "ingredients"
                      ? "bg-brand-purpbg text-white"
                      : "text-brand-muted hover:text-gray-900"
                  }`}
                >
                  Ingredients
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="instructions"
                  className={`px-2 py-2 text-sm font-medium rounded-lg transition-colors outline-none ${
                    activeTab === "instructions"
                      ? "bg-brand-purpbg text-white"
                      : "text-brand-muted hover:text-gray-900"
                  }`}
                >
                  Instructions
                </Tabs.Trigger>
              </Tabs.List>

              {/* Nutritional Value Tab */}
              <Tabs.Content value="nutritional" className="py-4">
                <div className="space-y-3 text-brand-subtext">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 text-sm text-brand-subtext">
                    <span className="font-light">Protein</span>
                    <span>
                      {defaultRecipe.nutritional_values.protein} g
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Carbohydrates</span>
                    <span>
                      {defaultRecipe.nutritional_values.carbohydrates} g
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Fats</span>
                    <span >
                      {defaultRecipe.nutritional_values.fats} g
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Fiber</span>
                    <span>
                      {defaultRecipe.nutritional_values.fiber} g
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Water Content</span>
                    <span>
                      {defaultRecipe.nutritional_values.water_content}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Potassium</span>
                    <span>
                      {defaultRecipe.nutritional_values.potassium}mg
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Calcium</span>
                    <span>
                      {defaultRecipe.nutritional_values.calcium}mg
                    </span>
                  </div>                
                </div>
              </Tabs.Content>

              {/* Ingredients Tab */}
              <Tabs.Content value="ingredients" className="py-4">
                <div className="space-y-3 text-brand-subtext">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 text-sm text-brand-subtext">
                    <span className="font-light">Protein</span>
                    <span>
                      {defaultRecipe.nutritional_values.protein} g
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Carbohydrates</span>
                    <span>
                      {defaultRecipe.nutritional_values.carbohydrates} g
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Fats</span>
                    <span >
                      {defaultRecipe.nutritional_values.fats} g
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Fiber</span>
                    <span>
                      {defaultRecipe.nutritional_values.fiber} g
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Water Content</span>
                    <span>
                      {defaultRecipe.nutritional_values.water_content}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Potassium</span>
                    <span>
                      {defaultRecipe.nutritional_values.potassium}mg
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-light">Calcium</span>
                    <span>
                      {defaultRecipe.nutritional_values.calcium}mg
                    </span>
                  </div>                
                </div>
              </Tabs.Content>

              {/* Instructions Tab */}
              <Tabs.Content value="instructions" className="py-4 pb-6">
                <div className="space-y-4">
                  {defaultRecipe.instructions.map((instruction, index) => (
                    <div>
                        <h3 className='
                        
                        '>
                            Prepare the base
                        </h3>
                        <li key={index} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                                {index + 1}
                            </span>
                            <span className="text-sm text-gray-700 leading-relaxed pt-0.5">
                                {instruction}
                            </span>
                        </li>
                    </div>
                  ))}
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RecipeDetailsSlideModal;