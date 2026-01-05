import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";

const emptyForm = {
  name: "",
  category: "",
  default_unit: "",
  description: "",
};

const IngredientModal = ({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
  loading = false
}) => {
  const [form, setForm] = useState(emptyForm);

  // sync edit values
  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setForm({
        name: initialValues.name ?? "",
        category: initialValues.category ?? "",
        default_unit: initialValues.default_unit ?? "",
        description: initialValues.description ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [mode, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />

        {/* Modal */}
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">
          
          <Dialog.Title className="text-xl text-center font-dash font-medium mb-1">
            {mode === "add" ? "Add Ingredient" : "Edit Ingredient"}
          </Dialog.Title>

          <Dialog.DialogDescription className="font-light text-brand-subtext text-center" >
            {mode === "add" ? "Add ingredient to your library" : "Edit your ingredient"}
          </Dialog.DialogDescription>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X />
            </button>
          </Dialog.Close>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Name */}
            <div className="flex flex-col">
              <label className={`mb-1 font-medium ${form.name?.trim() !== "" ? "text-brand-primary" : "text-brand-muted"}`}>Ingredient Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`${form.name?.trim() !== "" ? "border-brand-planoff border" : "border-brand-primary border"} border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-primary`}
                required
              />
            </div>

            {/* Selects */}
            <div className="flex gap-4">
              <CustomSelect
                label="Category"
                classNameLabel={form.preference ? "text-brand-primary" : "text-brand-muted"}
                value={form.category}
                options={[
                  "Bulk/Base",
                  "Seasonings",
                  "Aromatics",
                  "Acids / Bitters",
                  "Sugars",
                  "Fats",
                  "Units",
                  "Alcohols",
                  "Heat-dependent",
                ]}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, category: val }))
                }
              />

              <CustomSelect
                label="Default Unit"
                value={form.default_unit}
                options={[
                  "gram (g)",
                  "milliliters (ml)",
                  "tablespoon (tbsp)",
                  "teaspoon (tsp)",
                  "pieces (pcs)",
                  "cups (cps)",
                ]}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, default_unit: val }))
                }
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className={`mb-1 font-medium ${form.description?.trim() !== "" ? "text-brand-primary" : "text-brand-muted"}`}>
                Short Description (Optional)
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="border border-b-brand-gray px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-gray rounded-2xl resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-full mt-4 flex items-center justify-center gap-2
                ${loading
                  ? "bg-brand-secondary/60 cursor-not-allowed"
                  : "bg-brand-secondary hover:opacity-90"}
                text-white transition`}
            >
              {loading && (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}

              {loading
                ? mode === "add"
                  ? "Saving..."
                  : "Updating..."
                : mode === "add"
                ? "Save Ingredient"
                : "Update Ingredient"}
            </button>

          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default IngredientModal;
