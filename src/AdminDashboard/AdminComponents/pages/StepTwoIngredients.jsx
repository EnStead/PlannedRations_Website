import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import CustomSelect from "../../../Utility/CustomSelect";
import { useToast } from "../../Context/ToastProvider";
import api from "../../../Utility/api";

const UNITS = [
  "gram (g)",
  "milliliters (ml)",
  "tablespoon (tbsp)",
  "teaspoon (tsp)",
  "pieces (pcs)",
  "cups (cps)",
];

const StepTwoIngredients = ({
  onNext,
  onChange,
  onSaveDraft,
  initialIngredients,
}) => {
  const { showToast } = useToast();
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [ingredients, setIngredients] = useState(
    initialIngredients?.length > 0
      ? initialIngredients
      : [{ id: Date.now(), name: "", quantity: "", unit: "" }],
  );
  const [draggedIndex, setDraggedIndex] = useState(null);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onChangeRef.current?.(ingredients);
  }, [ingredients]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await api.get("/list-ingredient");
        setAvailableIngredients(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch ingredients", err);
      }
    };
    fetchIngredients();
  }, []);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), name: "", quantity: "", unit: "" },
    ]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    } else {
      // Reset the last one if it's the only one
      setIngredients([{ id: Date.now(), name: "", quantity: "", unit: "" }]);
    }
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    if (field === "name") {
      const selected = availableIngredients.find((i) => i.name === value);
      newIngredients[index] = {
        ...newIngredients[index],
        name: value,
        ingredient_id: selected?.id,
      };
    } else {
      newIngredients[index] = { ...newIngredients[index], [field]: value };
    }
    setIngredients(newIngredients);
  };

  const handleNext = () => {
    const validIngredients = ingredients.filter(
      (i) => i.name.trim() && i.quantity,
    );

    if (validIngredients.length === 0) {
      showToast({
        title: "Validation Error",
        description: "Please add at least one valid ingredient.",
        variant: "error",
      });
      return;
    }

    onNext(validIngredients);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    if (e.dataTransfer) {
      const img = new Image();
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      e.dataTransfer.setDragImage(img, 0, 0);
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDragEnter = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newIngredients = [...ingredients];
    const draggedItem = newIngredients[draggedIndex];
    newIngredients.splice(draggedIndex, 1);
    newIngredients.splice(index, 0, draggedItem);

    setIngredients(newIngredients);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <section>
      <div className="space-y-4">
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className={`flex gap-4 items-start transition-all duration-300 ease-in-out rounded-xl ingredient-row ${
              draggedIndex === index ? "shadow-2xl bg-white py-4 scale-[1.02] z-10" : ""
            }`}
            onDragEnter={(e) => {
              e.preventDefault();
              handleDragEnter(index);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <button
              type="button"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              className="mt-8 p-3 cursor-grab text-brand-subtext hover:text-brand-primary active:cursor-grabbing"
            >
              <GripVertical size={20} />
            </button>

            <div className="flex-1">
              <CustomSelect
                label="Ingredient"
                options={availableIngredients.map((i) => i.name)}
                value={ingredient.name}
                onChange={(val) => updateIngredient(index, "name", val)}
                classNameLabel={
                  ingredient.name ? "text-brand-primary" : "text-brand-cartext"
                }
                classNameSelect={
                  ingredient.name
                    ? "border-brand-primary"
                    : "border-brand-planoff"
                }
              />
            </div>

            <div className="">
              <label className={`mb-1 block font-medium transition ${
                ingredient.quantity ? "text-brand-primary" : "text-brand-cartext"
              }`}>
                Value
              </label>
              <input
                type="text"
                placeholder="Enter value"
                value={ingredient.quantity}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*\.?\d*$/.test(val))
                    updateIngredient(index, "quantity", val);
                }}
                className={`w-full border ${
                  ingredient.quantity?.trim()
                    ? "border-brand-primary"
                    : "border-brand-planoff"
                } bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff`}
              />
            </div>

            <div className="w-42">
              <CustomSelect
                label="Unit"
                options={UNITS}
                value={ingredient.unit}
                onChange={(val) => updateIngredient(index, "unit", val)}
                classNameLabel={
                  ingredient.unit ? "text-brand-primary" : "text-brand-cartext"
                }
                classNameSelect={
                  ingredient.unit
                    ? "border-brand-primary"
                    : "border-brand-planoff"
                }
              />
            </div>

            <button
              onClick={() => removeIngredient(index)}
              className="mt-8 p-3 text-brand-red hover:bg-red-50 rounded-full transition"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addIngredient}
        className="mt-6 flex items-center gap-2 text-brand-secondary font-medium hover:opacity-80"
      >
        <Plus size={20} />
        Add Another Ingredient
      </button>

      <div className="flex w-full justify-between mt-10">
        <button
          onClick={handleNext}
          className="bg-brand-secondary text-white rounded-full px-6 py-3 font-medium hover:opacity-90"
        >
          Next: Add Steps
        </button>

        <button
          onClick={onSaveDraft}
          className="text-brand-primary rounded-full px-16 py-3 font-bold border hover:bg-brand-primary hover:text-white transition"
        >
          Save as Draft
        </button>
      </div>
    </section>
  );
};

export default StepTwoIngredients;
