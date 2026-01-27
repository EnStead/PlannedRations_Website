import { Check, ChevronDown, CloudUpload, Plus, X } from "lucide-react";
import CustomSelect from "./CustomSelect";
import { useEffect, useRef, useState } from "react";
import * as Select from "@radix-ui/react-select";
import api from "./api";
import { useToast } from "../AdminDashboard/Context/ToastProvider";

const EXTRA_NUTRIENT_OPTIONS = [
  "Fiber",
  "Sugar",
  "Sodium",
  "Cholesterol",
  "Vitamin A",
  "Vitamin B12",
  "Vitamin C",
  "Vitamin D",
  "Calcium",
  "Iron",
  "Potassium",
  "Magnesium",
  "Zinc",
];

const StepOneBasics = ({ onNext, onSaveDraft, onChange, initialData, initialImage, existingImage }) => {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    tags: initialData?.tags || [],
    base_servings: initialData?.base_servings || "",
    calories: initialData?.calories || "",
    cooking_time: initialData?.cooking_time || "",
    difficulty: initialData?.difficulty || "",
  });

  const [imageFile, setImageFile] = useState(initialImage || null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef(null);
  const [tagsOpen, setTagsOpen] = useState(false);
  const tagsRef = useRef(null);

  const initialFixedNutrients = [
    { id: "protein", label: "Protein", value: "", unit: "g" },
    { id: "carbs", label: "Carbohydrates", value: "", unit: "g" },
    { id: "fats", label: "Fats", value: "", unit: "g" },
  ];
  const [fixedNutrients, setFixedNutrients] = useState(() => {
    if (initialData?.nutrition?.length > 0) {
      return initialFixedNutrients.map((def) => {
        const found = initialData.nutrition.find((n) => n.label === def.label);
        return found ? { ...def, value: found.value, unit: found.unit } : def;
      });
    }
    return initialFixedNutrients;
  });
  const [availableTags, setAvailableTags] = useState([]);

  // Dynamic additional nutrients
  const [extraNutrients, setExtraNutrients] = useState(() => {
    if (initialData?.nutrition?.length > 0) {
      return initialData.nutrition
        .filter((n) => !["Protein", "Carbohydrates", "Fats"].includes(n.label))
        .map((n, i) => ({
          id: Date.now().toString() + i,
          label: n.label,
          value: n.value,
          unit: n.unit,
        }));
    }
    return [];
  });

  // units list
  const units = ["g", "ml", "tbsp", "tsp", "pcs", "cps"];

  // Fetch tags from backend
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get("/admin/tags/list/all?applies_to=recipe");
        setAvailableTags(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch tags", err);
      }
    };
    fetchTags();
  }, []);

  // handle image selection
useEffect(() => {
  if (!imageFile) {
    if (existingImage && imagePreview !== existingImage) {
      setImagePreview(existingImage);
    } else if (!existingImage && imagePreview !== null) {
      setImagePreview(null);
    }
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => setImagePreview(e.target.result);
  reader.readAsDataURL(imageFile);
}, [imageFile, existingImage]); // imagePreview intentionally not included

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

  // Sync changes with parent for Live Preview & Unsaved Changes check
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const nutrition = [
      ...fixedNutrients.map(({ label, value, unit }) => ({
        label,
        value,
        unit,
      })),
      ...extraNutrients.map(({ label, value, unit }) => ({
        label,
        value,
        unit,
      })),
    ];

    const updatedData = { ...form, tags: form.tags, nutrition };
    // Pass data, image file, and the current preview string
    onChangeRef.current?.(updatedData, imageFile, imagePreview);
  }, [form, fixedNutrients, extraNutrients, imageFile]);

  // Handle click outside for tags dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagsRef.current && !tagsRef.current.contains(event.target)) {
        setTagsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTag = (tagId) => {
    setForm((prev) => {
      const currentTags = Array.isArray(prev.tags) ? prev.tags : [];
      if (currentTags.includes(tagId)) {
        return { ...prev, tags: currentTags.filter((id) => id !== tagId) };
      } else {
        return { ...prev, tags: [...currentTags, tagId] };
      }
    });
  };

  // fixed nutrient update
  const updateFixedNutrient = (id, changes) => {
    setFixedNutrients((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...changes } : n)),
    );
  };

  // extra nutrients handlers
  const addExtraNutrient = () => {
    setExtraNutrients((prev) => [
      ...prev,
      { id: Date.now().toString(), label: "", value: "", unit: "g" },
    ]);
  };

  const updateExtraNutrient = (id, changes) => {
    setExtraNutrients((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...changes } : n)),
    );
  };

  const removeExtraNutrient = (id) => {
    setExtraNutrients((prev) => prev.filter((n) => n.id !== id));
  };

  const handleNext = () => {
    if (!form.name.trim()) {
      showToast({
        title: "Validation Error",
        description: "Recipe name is required",
        variant: "error",
      });
      return;
    }

    const nutrition = [
      ...fixedNutrients.map(({ label, value, unit }) => ({
        label,
        value,
        unit,
      })),
      ...extraNutrients.map(({ label, value, unit }) => ({
        label,
        value,
        unit,
      })),
    ];

    onNext(
      {
        ...form,
        tags: form.tags,
        nutrition,
      },
      imageFile,
    );
  };

  // small helper for drag-and-drop
  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    onDropOrSelectFile(f);
  };

  return (
    <section>
      {/* UPLOAD AND TAG */}
      <div className="grid grid-cols-2 gap-4 ">
        <div className="">
          <label
            className={`mb-2 block font-medium transition text-brand-cartext`}
          >
            Recipe Image
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="bg-brand-carhead border flex justify-center flex-col 
                    items-center border-brand-planoff rounded-xl h-40 text-center p-4 cursor-pointer "
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
                  <CloudUpload />
                </div>
                <p className="text-brand-muted mb-1">
                  <span className="font-medium text-brand-purUp">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-brand-muted">
                  PNG or JPG (preferably portrait)
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* RECIPE NAME */}
        <div className="flex flex-col my-7">
          <label
            htmlFor="recipeName"
            className={`mb-1 font-medium transition ${
              form.name?.trim() ? "text-brand-primary" : "text-brand-cartext"
            }`}
          >
            Recipe Name
          </label>
          <input
            id="recipeName"
            type="text"
            name="recipeName"
            placeholder="Eg; Pasta Alfredo, Avocado Toast"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`border ${
              form.name?.trim()
                ? "border-brand-primary"
                : "border-brand-planoff"
            } bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff`}
          />
        </div>
        {/* TAG SELECT */}
        <div className="flex flex-col my-7 relative" ref={tagsRef}>
          <label
            className={`mb-1 font-medium transition ${
              form.tags?.length > 0
                ? "text-brand-primary"
                : "text-brand-cartext"
            }`}
          >
            Tags
          </label>
          <button
            type="button"
            onClick={() => setTagsOpen(!tagsOpen)}
            className={`border ${
              form.tags?.length > 0
                ? "border-brand-primary"
                : "border-brand-planoff"
            } bg-brand-carhead rounded-full px-4 py-3 flex justify-between items-center focus:outline-none`}
          >
            <span
              className={`truncate ${
                form.tags?.length > 0
                  ? "text-brand-primary"
                  : "text-brand-cartext"
              }`}
            >
              {form.tags?.length > 0
                ? availableTags
                    .filter((t) => form.tags.includes(t.id))
                    .map((t) => t.title)
                    .join(", ")
                : "Select tags..."}
            </span>
            <ChevronDown
              size={18}
              className={
                form.tags?.length > 0
                  ? "text-brand-primary"
                  : "text-brand-cartext"
              }
            />
          </button>

          {tagsOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-brand-planoff rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto p-2">
              {availableTags.length > 0 ? (
                availableTags.map((tag) => (
                  <div
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className="flex items-center justify-between px-4 py-2 hover:bg-brand-secondary/30 rounded-lg cursor-pointer transition"
                  >
                    <span className="text-brand-subtext">{tag.title}</span>
                    {form.tags.includes(tag.id) && (
                      <Check size={16} className="text-brand-secondary" />
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-brand-muted text-sm">
                  No tags available
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col sm:col-span-2">
        <label
          className={`mb-1 font-medium transition ${
            form.description?.trim()
              ? "text-brand-primary"
              : "text-brand-cartext"
          }`}
        >
          Short Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          placeholder="Select from the options..."
          className={`border ${
            form.description?.trim()
              ? "border-brand-primary"
              : "border-brand-planoff"
          } bg-brand-carhead px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-planoff resize-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 my-7">
        {/* BASE SERVINGS */}
        <div className="">
          <CustomSelect
            label="Base Servings"
            classNameLabel={
              form.base_servings ? "text-brand-primary" : "text-brand-cartext"
            }
            classNameSelect={
              form.base_servings
                ? "border-brand-primary"
                : "border-brand-planoff"
            }
            options={[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
            ]}
            value={form.base_servings}
            onChange={(val) => setForm({ ...form, base_servings: val })}
          />
        </div>

        {/* CALORIES */}
        <div className="flex flex-col ">
          <label
            htmlFor="calories"
            className={`relative mb-1 font-medium transition ${
              form.calories ? "text-brand-primary" : "text-brand-cartext"
            }`}
          >
            Calories
          </label>
          <div className="relative">
            <input
              id="calories"
              type="text"
              name="calories"
              placeholder="Enter value"
              value={form.calories}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d*$/.test(val))
                  setForm({ ...form, calories: val });
              }}
              className={`border w-full ${
                form.calories ? "border-brand-primary" : "border-brand-planoff"
              } bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff`}
            />
            <span className="absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium">
              kcal
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-7">
        {/* COOKING TIME */}
        <div className="flex flex-col ">
          <label
            htmlFor="cookingTime"
            className={`relative mb-1 font-medium transition ${
              form.cooking_time ? "text-brand-primary" : "text-brand-cartext"
            }`}
          >
            Cooking Time
          </label>
          <div className="relative">
            <input
              id="cookingTime"
              type="text"
              name="cookingTime"
              placeholder="Enter value"
              value={form.cooking_time}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d*$/.test(val))
                  setForm({ ...form, cooking_time: val });
              }}
              className={`border w-full ${
                form.cooking_time
                  ? "border-brand-primary"
                  : "border-brand-planoff"
              } bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff`}
            />
            <span className="absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium">
              min
            </span>
          </div>
        </div>

        {/* DIFFICULTY */}
        <div className="">
          <CustomSelect
            label="Difficulty"
            classNameLabel={
              form.difficulty ? "text-brand-primary" : "text-brand-cartext"
            }
            classNameSelect={
              form.difficulty ? "border-brand-primary" : "border-brand-planoff"
            }
            options={["Easy", "Medium", "Hard"]}
            value={form.difficulty}
            onChange={(val) => setForm({ ...form, difficulty: val })}
          />
        </div>
      </div>

      {/* NUTRITIONAL VALUE */}
      <div>
        <h3 className="text-brand-primary font-medium font-dash mb-7">
          Nutritional Value
        </h3>
        <div className="border border-brand-planoff rounded-xl p-7">
          {/* Fixed nutrients (first three) */}
          {fixedNutrients.map((n) => (
            <div
              key={n.id}
              className="grid grid-cols-2 gap-4 mb-4 items-center"
            >
              {/* Macros label - fixed */}
              <div>
                <label className="text-brand-primary font-medium mb-2 block">
                  Macros/Micros
                </label>
                {/* If you want a select for label but fixed: use a disabled select or label only */}
                <input
                  value={n.label}
                  disabled
                  className="border border-brand-primary bg-brand-carhead rounded-full px-4 py-3 w-full"
                />
              </div>

              {/* Value + unit */}
              <div className="flex flex-col">
                <label
                  className={`mb-1 font-medium transition ${
                    n.value ? "text-brand-primary" : "text-brand-cartext"
                  }`}
                >
                  Value
                </label>
                <div className="relative">
                  <input
                    value={n.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*\.?\d*$/.test(val))
                        updateFixedNutrient(n.id, { value: val });
                    }}
                    placeholder="Enter value"
                    className={`border w-full ${
                      n.value ? "border-brand-primary" : "border-brand-planoff"
                    } bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff`}
                  />
                  <div className="absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium">
                    <select
                      value={n.unit}
                      onChange={(e) =>
                        updateFixedNutrient(n.id, { unit: e.target.value })
                      }
                      className="bg-transparent"
                    >
                      {units.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Extra nutrients (dynamic) */}
          {extraNutrients.map((n) => (
            <div
              key={n.id}
              className="grid grid-cols-2 gap-4 mb-4 items-center"
            >
              <div>
                <CustomSelect
                  label="Macros/Micros"
                  classNameLabel={
                    n.label ? "text-brand-primary" : "text-brand-cartext"
                  }
                  classNameSelect={
                    n.label ? "border-brand-primary" : "border-brand-planoff"
                  }
                  options={EXTRA_NUTRIENT_OPTIONS}
                  value={n.label}
                  onChange={(val) => updateExtraNutrient(n.id, { label: val })}
                />
              </div>

              <div className="w-full">
                <label
                  className={`mb-1 font-medium transition ${
                    n.value ? "text-brand-primary" : "text-brand-cartext"
                  }`}
                >
                  Value
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      value={n.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*\.?\d*$/.test(val))
                          updateExtraNutrient(n.id, { value: val });
                      }}
                      placeholder="Enter value"
                      className={`border w-full ${
                        n.value
                          ? "border-brand-primary"
                          : "border-brand-planoff"
                      } bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff`}
                    />
                    <div className="absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium">
                      <select
                        value={n.unit}
                        onChange={(e) =>
                          updateExtraNutrient(n.id, { unit: e.target.value })
                        }
                        className="bg-transparent"
                      >
                        {units.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => removeExtraNutrient(n.id)}
                    className="p-2 rounded-full text-brand-red hover:bg-brand-planoff"
                    aria-label="Remove nutrient"
                  >
                    <X />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div>
            <button
              type="button"
              onClick={addExtraNutrient}
              className="flex text-brand-secondary gap-2 w-fit items-center"
            >
              <Plus />
              <p className="font-medium">Add New Nutrient</p>
            </button>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex w-full justify-between mt-8">
        <button
          type="button"
          onClick={handleNext}
          className="bg-brand-secondary text-white rounded-full px-6 py-3 font-medium"
        >
          Next: Add Ingredient
        </button>

        <button
          onClick={() => {
            const nutrition = [
              ...fixedNutrients.map(({ label, value, unit }) => ({
                label,
                value,
                unit,
              })),
              ...extraNutrients.map(({ label, value, unit }) => ({
                label,
                value,
                unit,
              })),
            ];

            onSaveDraft(
              {
                ...form,
                tags: form.tags,
                nutrition,
              },
              imageFile,
            );
          }}
          className="text-brand-primary rounded-full px-16 py-3 font-bold border hover:bg-brand-primary hover:text-white transition"
        >
          Save as Draft
        </button>
      </div>
    </section>
  );
};

export default StepOneBasics;
