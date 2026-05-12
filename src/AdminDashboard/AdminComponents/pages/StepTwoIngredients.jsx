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
  "pounds (lbs)",
  "ounces (oz)",
];

const FRACTIONS = ["-", "½", "¼", "⅛", "⅓", "⅔", "¾", "⅜", "⅝", "⅞"];

const FRACTION_MAP = {
  "½": "(1/2)",
  "¼": "(1/4)",
  "⅛": "(1/8)",
  "⅓": "(1/3)",
  "⅔": "(2/3)",
  "¾": "(3/4)",
  "⅜": "(3/8)",
  "⅝": "(5/8)",
  "⅞": "(7/8)",
};

const REVERSE_FRACTION_MAP = Object.fromEntries(
  Object.entries(FRACTION_MAP).map(([k, v]) => [v, k])
);

const StepTwoIngredients = ({
  onNext,
  onChange,
  onSaveDraft,
  initialIngredients,
}) => {
  const { showToast } = useToast();
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [ingredients, setIngredients] = useState(() => {
    if (initialIngredients?.length > 0) {
      return initialIngredients.map((ing) => {
        let base_quantity = String(ing.quantity || "");
        let fraction = "-";

        // Try extracting any appended fraction back into the select value
        for (const [fracStr, char] of Object.entries(REVERSE_FRACTION_MAP)) {
          if (base_quantity.endsWith(fracStr)) {
            fraction = char;
            base_quantity = base_quantity.slice(0, -fracStr.length).trim();
            break;
          } else if (base_quantity.endsWith(char)) {
            fraction = char;
            base_quantity = base_quantity.slice(0, -char.length).trim();
            break;
          }
        }
        return { ...ing, base_quantity, fraction };
      });
    }
    return [{ id: Date.now(), name: "", base_quantity: "", fraction: "-", unit: "" }];
  });
  const [draggedIndex, setDraggedIndex] = useState(null);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const getComputedIngredients = (ings) => {
    return ings.map((ing) => {
      const q = ing.base_quantity?.trim() || "";
      const f = ing.fraction && ing.fraction !== "-" ? ing.fraction : "";

      let computedQuantity = q;
      if (f) {
        const fracStr = FRACTION_MAP[f] || f;
        computedQuantity = q ? `${q}${fracStr}` : fracStr;
      }
      return { ...ing, quantity: computedQuantity };
    });
  };

  useEffect(() => {
    onChangeRef.current?.(getComputedIngredients(ingredients));
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
      { id: Date.now(), name: "", base_quantity: "", fraction: "-", unit: "" },
    ]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    } else {
      // Reset the last one if it's the only one
      setIngredients([{ id: Date.now(), name: "", base_quantity: "", fraction: "-", unit: "" }]);
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
    const computed = getComputedIngredients(ingredients);
    const validIngredients = computed.filter(
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
            className={`flex flex-col sm:flex-row gap-4 items-start transition-all duration-300 ease-in-out rounded-xl ingredient-row ${
              draggedIndex === index ? "shadow-2xl bg-white py-4 scale-[1.02] z-10" : ""
            }`}
            onDragEnter={(e) => {
              e.preventDefault();
              handleDragEnter(index);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="flex-1 w-full flex gap-2 items-start">
              <button
                type="button"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                className="mt-3 sm:mt-8 p-3 cursor-grab text-brand-subtext hover:text-brand-primary active:cursor-grabbing"
              >
                <GripVertical size={20} />
              </button>

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

            <div className="w-full sm:w-auto">
              <label className={`mb-1 block font-medium transition ${
                ingredient.base_quantity ? "text-brand-primary" : "text-brand-cartext"
              }`}>
                Value
              </label>
              <input
                type="text"
                placeholder="Enter value"
                value={ingredient.base_quantity}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*\.?\d*$/.test(val))
                    updateIngredient(index, "base_quantity", val);
                }}
                className={`w-full border ${
                  ingredient.base_quantity?.trim()
                    ? "border-brand-primary"
                    : "border-brand-planoff"
                } bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff`}
              />
            </div>

            <div className="w-full sm:w-27">
              <CustomSelect
                label="Fraction"
                options={FRACTIONS}
                value={ingredient.fraction}
                onChange={(val) => updateIngredient(index, "fraction", val)}
                classNameLabel={
                  ingredient.fraction && ingredient.fraction !== "-" ? "text-brand-primary" : "text-brand-cartext"
                }
                classNameSelect={
                  ingredient.fraction && ingredient.fraction !== "-"
                    ? "border-brand-primary"
                    : "border-brand-planoff"
                }
              />
            </div>
            
            <div className="w-full sm:w-42">
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
              className="mt-0 sm:mt-8 p-3 text-brand-red hover:bg-red-50 rounded-full transition self-end sm:self-auto"
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

      <div className="flex flex-col sm:flex-row w-full justify-between mt-10 gap-4">
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
