import { useState } from 'react';
import CustomSelect from './CustomSelect';

const IngredientModal = ({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
}) => {

  const [form, setForm] = useState(initialValues || {
    ingredient: "",
    category: "",
    defaultUnit: "",
    usedIn: "",
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };  


  return open ? (
    <div onClick={onClose}  className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <form className="bg-white rounded-xl p-6 w-[500px] relative" onSubmit={handleSubmit}>

        <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-black  py-1 px-3  z-10 cursor-pointer text-4xl font-semibold"
        >
            ×
        </button>
        <h2 className="text-xl text-center font-medium mb-1 text-brand-cardhead">
          {mode === "add" ? "Add Ingredient" : "Edit Ingredient"}
        </h2>
        <p className='font-light text-center text-brand-subtext mb-4' >
            Add ingredient to your library
        </p>

        {/* Ingredient */}
        <div className="flex flex-col">
            <label htmlFor="ingredient" className={`mb-1 font-medium transition text-brand-cartext
                ${form.ingredient?.trim() !== "" ? "text-brand-primary" : "text-brand-cartext"}
            `}
            > 
                Ingredient Name
            </label>
            <input
            id="ingredient"
            type="text"
            name="ingredient"
            placeholder="Eg; Rice, Pasta, Tomato Puree"
            value={form.ingredient}
            // onChange={handleChange}
            className="border border-brand-planoff rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
            />
        </div>

        {/* Selects side by side */}
        <div className="flex flex-col sm:flex-row gap-4 my-4">
            <CustomSelect
                label="Category"
                classNameLabel={form.category ? "text-black" : "text-brand-cartext"}
                options={["Bulk/Base Eg: rice, pasta, potatoes, veg, stock, water, meats", "Seasonings Eg: salt, chiles, spicy pastes", "Aromatics Eg: garlic, ginger, fresh herbs","Acids / Bitters Eg: lemon juice, vinegar", "Sugars Eg: honey in dressings", "Fats Eg: butter, oil", "Leaveners (baking) Eg: baking powder/soda", "Units Eg: eggs, bouillon cubes", "Alcohols Eg: wine, spirits", "Heat-dependent Eg: chiles, pepper"]}
                value={form.category}
                // onChange={(val) => setForm({ ...form, how_you_heard: val })}
            />

            <CustomSelect
            label="Default Unit"
            classNameLabel={form.defaultUnit ? "text-black" : "text-brand-cartext"}
            options={["gram (g)", "milliliters (ml)", "tablespoon (tbsp)", "teaspoon (tsp)", "pieces (pcs)", "cups (cps)"]}
            value={form.defaultUnit}
            // onChange={(val) => setForm({ ...form, goal_type: val })}
            />
        </div>

        {/* Description */}
        <div className="flex flex-col sm:col-span-2">
            <label  className={`mb-1 font-medium transition text-brand-cartext
                ${form.description?.trim() !== "" ? "text-brand-primary" : "text-brand-cartext"}
            `}>
                Short Description (Optional)
            
            </label>
            <textarea
                name="description"
                value={form.description}
                // onChange={handleChange}
                rows={4}
                placeholder="Type Tips or description of ingredient..."
                className=" border border-brand-planoff px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-planoff resize-none"
            />
        </div>
        

        <button type="submit" className="bg-brand-secondary w-full text-white px-6 py-2 mt-8 rounded-full">
          {mode === "add" ? "Save Ingredient" : "Update Ingredient"}
        </button>
      </form>
    </div>
  ) : null;
}

export default IngredientModal