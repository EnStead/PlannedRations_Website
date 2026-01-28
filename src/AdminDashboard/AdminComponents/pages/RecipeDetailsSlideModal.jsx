import { useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { X, MoreVertical } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import api from '../../../Utility/api';
import RecipeImg from '../../../assets/RecipeImg.png'

const RecipeDetailsSlideModal = ({ open, onOpenChange, recipe, onEdit, onUnpublish, onDelete }) => {


  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipe-details", recipe],
    queryFn: () =>
      api.get(`/admin/recipes/${recipe}`).then(res => res.data.data),
    enabled: !!recipe && open,
  });



  const [activeTab, setActiveTab] = useState("nutritional");



  const handleEdit = () => {
    if (onEdit) onEdit();
  };

  const handleUnpublish = () => {
    if (onUnpublish) onUnpublish(data);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(data);
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        {/* {isLoading && (
          <p className="text-sm text-brand-muted">Loading recipe...</p>
        )} */}

        {isError && (
          <p className="text-sm text-red-500">
            Failed to load recipe details
          </p>
        )}

        {data && (

        <Dialog.Portal>
          {/* Overlay */}
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />

          {/* Modal Content */}
          <Dialog.Content className="fixed z-50 top-0 right-0 h-full w-full sm:w-[400px] hide-scrollbar transform  bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
            
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
 

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              {/* Recipe Image */}
              <div className="px-6 pt-4">
                <img 
                  src={data.image_url || RecipeImg} 
                  alt={data.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Recipe Info */}
              <div className="px-6 py-4">
                <h2 className="text-xl font-medium text-brand-primary font-dash mb-2">
                  {data.name}
                </h2>
                <p className="text-sm text-brand-subtext font-light">
                  {data.description}
                </p>
              </div>

              {/* Stats */}
              <div className="px-6 pb-4 flex items-center justify-between text-brand-subtext">
                <div className="text-center">
                  <p className="font-medium ">{data.base_servings}</p>
                  <p className="text-xs ">Base Servings</p>
                </div>
                <div className="text-center">
                  <p className="font-medium">{data.calories} kcal</p>
                  <p className="text-xs">Calories</p>
                </div>
                <div className="text-center">
                  <p className=" font-medium">{data.cooking_time} mins</p>
                  <p className="text-xs">Cooking Time</p>
                </div>
              </div>

              {/* Tabs */}
              <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="px-6">
                <Tabs.List className="flex justify-between gap-2">
                  {[
                    { value: "nutritional", label: "Nutritional Value" },
                    { value: "ingredients", label: "Ingredients" },
                    { value: "instructions", label: "Instructions" },
                  ].map(tab => (
                    <Tabs.Trigger
                      key={tab.value}
                      value={tab.value}
                      className={`px-2 py-2 text-xs font-medium rounded-lg transition-colors outline-none ${
                        activeTab === tab.value
                          ? "bg-brand-purpbg text-white"
                          : "text-brand-muted hover:text-gray-900"
                      }`}
                    >
                      {tab.label}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>

                {/* Nutritional Tab */}
                <Tabs.Content value="nutritional" className="py-4">
                  <div className="space-y-3">
                    {data?.nutrition?.length ? (
                      data.nutrition.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-gray-100 text-sm text-brand-subtext"
                        >
                          <span className="font-light">{item.name}</span>
                          <span>{item.value} {item.unit}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-brand-muted">No nutritional data</p>
                    )}
                  </div>
                </Tabs.Content>

                {/* Ingredients Tab */}
                <Tabs.Content value="ingredients" className="py-4">
                  <div className="space-y-3">
                    {data?.ingredients?.length ? (
                      data.ingredients.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-gray-100 text-sm text-brand-subtext"
                        >
                          <span className="font-light">{item.name}</span>
                          <span>{item.quantity} {item.unit}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-brand-muted">No ingredients listed</p>
                    )}
                  </div>
                </Tabs.Content>

                {/* Instructions Tab */}
                <Tabs.Content value="instructions" className="py-4 pb-6">
                  <div className="space-y-4">
                    {data?.steps?.length ? (
                      data.steps.map((step, index) => (
                        <div  key={index} className='space-y-3'>
                          <div className="flex justify-between items-center font-dash">
                            <h3 className=" text-brand-primary font-medium">
                              {step.title}
                            </h3>
                            <p className=" text-brand-muted">
                              Step {step.order}
                            </p>
                          </div>
                          <ul className='list-disc ml-10 text-sm text-brand-muted font-light'>
                            <li>
                              {step.instruction}
                            </li>
                          </ul>
                            {
                              step.tip ? 
                              <span className='text-sm text-brand-muted italic'>
                                {step.tip}
                              </span> : null
                            }
                    
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-brand-muted">No instructions provided</p>
                    )}
                  </div>
                </Tabs.Content>
              </Tabs.Root>

            </div>
          </Dialog.Content>
        </Dialog.Portal>
        )}
      </Dialog.Root>
    
    </>
  );
};

export default RecipeDetailsSlideModal;