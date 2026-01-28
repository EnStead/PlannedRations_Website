import * as Dialog from "@radix-ui/react-dialog";
import { X, CloudUpload } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import CustomSelect from "./CustomSelect";

const UNITS = [
  "gram (g)",
  "milliliters (ml)",
  "tablespoon (tbsp)",
  "teaspoon (tsp)",
  "pieces (pcs)",
  "cups (cps)",
];

const CATEGORIES = [
  "Vegetables",
  "Fruits",
  "Meat & Poultry",
  "Seafood",
  "Dairy & Eggs",
  "Grains & Pasta",
  "Legumes",
  "Spices & Herbs",
  "Oils & Fats",
  "Nuts & Seeds",
  "Baking",
  "Condiments",
  "Beverages",
  "Other",
];

const IngredientModal = ({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    default_unit: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setForm({
        name: initialValues.name || "",
        category: initialValues.category || "",
        default_unit: initialValues.default_unit || initialValues.defaultUnit || "",
        description: initialValues.description || "",
      });
      setImagePreview(initialValues.image_url || null);
    } else {
      setForm({
        name: "",
        category: "",
        default_unit: "",
        description: "",
      });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [mode, initialValues, open]);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const onDropOrSelectFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG/JPG).");
      return;
    }
    setImageFile(file);
  };

  const handleFileInputChange = (e) => {
    const f = e.target.files?.[0];
    onDropOrSelectFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    onDropOrSelectFile(f);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, image: imageFile });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed z-60 top-1/2 left-1/2 w-[580px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">
          <Dialog.Title className="text-xl text-center font-dash font-medium mb-1">
            {mode === "add" ? "Add Ingredient" : "Edit Ingredient"}
          </Dialog.Title>
          <Dialog.Description className="font-light text-brand-subtext text-center mb-6">
            {mode === "add"
              ? "Add a new ingredient to the library"
              : "Update ingredient details"}
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X />
            </button>
          </Dialog.Close>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="mb-2 block font-medium transition text-brand-cartext">
                Ingredient Image
              </label>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileRef.current?.click()}
                className="bg-brand-carhead border flex justify-center flex-col 
                        items-center border-brand-planoff rounded-xl h-32 text-center p-4 cursor-pointer"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="h-full object-contain rounded-lg"
                  />
                ) : (
                  <>
                    <div className="text-center mb-1 rounded-full text-brand-cloud p-2 w-fit bg-brand-purp border border-brand-background1 text-xl">
                      <CloudUpload size={20} />
                    </div>
                    <p className="text-brand-muted text-sm mb-1">
                      <span className="font-medium text-brand-purUp">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                  </>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                className={`mb-1 font-medium ${
                  form.name ? "text-brand-primary" : "text-brand-muted"
                }`}
              >
                Ingredient Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Tomato, Chicken Breast"
                required
                className={`border ${
                  form.name ? "border-brand-primary" : "border-brand-planoff"
                } rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-primary`}
              />
            </div>

            <div className="flex gap-3">
              <CustomSelect
                label="Category"
                options={CATEGORIES}
                value={form.category}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, category: val }))
                }
                classNameLabel={
                  form.category ? "text-brand-primary" : "text-brand-muted"
                }
                classNameSelect={
                  form.category
                    ? "border-brand-primary"
                    : "border-brand-planoff"
                }
              />

              <CustomSelect
                label="Default Unit"
                options={UNITS}
                value={form.default_unit}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, default_unit: val }))
                }
                classNameLabel={
                  form.default_unit ? "text-brand-primary" : "text-brand-muted"
                }
                classNameSelect={
                  form.default_unit
                    ? "border-brand-primary"
                    : "border-brand-planoff"
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                className={`mb-1 font-medium ${form.description ? "text-brand-primary" : "text-brand-muted"}`}
              >
                Short Description (Optional)
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Brief description of the ingredient..."
                className={`border ${form.description ? "border-brand-primary" : "border-brand-planoff"} rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-primary resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-full bg-brand-secondary font-bold text-white hover:opacity-90 disabled:opacity-60"
            >
              {loading
                ? mode === "add"
                  ? "Adding..."
                  : "Updating..."
                : mode === "add"
                ? "Add Ingredient"
                : "Update Ingredient"}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default IngredientModal;