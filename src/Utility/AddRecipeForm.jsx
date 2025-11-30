import {CloudUpload, Plus, X } from 'lucide-react';
import CustomSelect from './CustomSelect';
import { useEffect, useRef, useState } from 'react';

const AddRecipeForm = () => {

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef(null);

  const [tags, setTags] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [baseServings, setBaseServings] = useState("");
  const [calories, setCalories] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState("");

    // Fixed first three nutrients
  const initialFixedNutrients = [
    { id: "protein", label: "Protein", value: "", unit: "g" },
    { id: "carbs", label: "Carbohydrates", value: "", unit: "g" },
    { id: "fats", label: "Fats", value: "", unit: "g" },
  ];
  const [fixedNutrients, setFixedNutrients] = useState(initialFixedNutrients);

  // Dynamic additional nutrients
  const [extraNutrients, setExtraNutrients] = useState([
    // example empty
  ]);

  // units list
  const units = ["g", "ml", "tbsp", "tsp", "pcs", "cps"];

 // handle image selection
  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(imageFile);
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

  // fixed nutrient update
  const updateFixedNutrient = (id, changes) => {
    setFixedNutrients((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...changes } : n))
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
    setExtraNutrients((prev) => prev.map((n) => (n.id === id ? { ...n, ...changes } : n)));
  };

  const removeExtraNutrient = (id) => {
    setExtraNutrients((prev) => prev.filter((n) => n.id !== id));
  };

  // collect final payload
  const buildPayload = () => {
    return {
      recipeName,
      description,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      baseServings,
      calories,
      cookingTime,
      difficulty,
      nutrients: [
        ...fixedNutrients.map(({ id, label, value, unit }) => ({ id, label, value, unit })),
        ...extraNutrients.map(({ id, label, value, unit }) => ({ id, label, value, unit })),
      ],
      // image: imageFile (you might want to send as FormData)
    };
  };


  // Save as draft: attempt API, fallback to localStorage
  const saveAsDraft = async () => {
    const payload = buildPayload();

    // if backend available you'd do something like:
    // const formData = new FormData();
    // formData.append('image', imageFile);
    // formData.append('payload', JSON.stringify(payload));
    // await fetch('/api/recipes/draft', { method: 'POST', body: formData });

    // Because APIs aren't ready, try hitting API then fallback
    try {
      if (onSaveDraft) {
        await onSaveDraft(payload, imageFile);
        console.log("Draft saved via provided onSaveDraft callback.");
      } else {
        // try calling API if it exists
        const res = await fetch("/api/recipes/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("API responded with error");
        console.log("Draft successfully saved to API.");
      }
      alert("Draft saved.");
    } catch (err) {
      // fallback: localStorage
      const key = `recipe_draft_${Date.now()}`;
      const draftToSave = { ...payload, savedAt: new Date().toISOString() };
      try {
        localStorage.setItem(key, JSON.stringify(draftToSave));
        alert("API not available — draft saved locally.");
        console.warn("Saved draft to localStorage as fallback:", key);
      } catch (e) {
        alert("Failed to save draft locally.");
        console.error(e);
      }
    }
  };

  // Next: validate minimal fields then call onNext or navigate
  const handleNext = () => {
    // example validation
    if (!recipeName.trim()) {
      alert("Please enter the recipe name before proceeding.");
      return;
    }
    // ensure at least the fixed nutrient values are filled (optional)
    // depends on your requirements — adjust as needed
    const payload = buildPayload();
    if (onNext) {
      onNext(payload, imageFile);
      return;
    }
    // default behavior: console.log (you can replace with react-router navigate)
    console.log("Next payload =>", payload);
    alert("Proceeding to Add Ingredients (this is a placeholder).");
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
        <div className='grid grid-cols-2 gap-4 ' >
            <div className=''>
                <label  className={`mb-2 block font-medium transition text-brand-cartext`}>
                    Recipe Image                
                </label>
                <div 
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileRef.current?.click()}
                    className='bg-brand-carhead border flex justify-center flex-col 
                    items-center border-brand-planoff rounded-xl h-40 text-center p-4 '
                >
                    {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="h-full object-contain rounded-lg" />
                        ) : (
                        <>
                            <div className="text-center mb-1 rounded-full text-brand-cloud p-2 w-fit bg-brand-purp border border-brand-background1 text-xl">
                            <CloudUpload />
                            </div>
                            <p className="text-brand-muted mb-1">
                            <span className="font-medium text-brand-purUp">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-brand-muted">PNG or JPG (preferably portrait)</p>
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
            {/* Tag */}
            <div className="flex flex-col ">
                <label  className={`mb-2 font-medium transition text-brand-cartext`}>
                    Tags                
                </label>
                <textarea
                    name="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    rows={4}
                    placeholder="Add different tags separated by commas."
                    className=" border border-brand-planoff bg-brand-carhead h-40 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-planoff resize-none"
                />
            </div>        
        </div>

        {/* RECIPE NAME */}
        <div className="flex flex-col my-7"> 
            <label htmlFor="recipeName" className={'mb-1 font-medium transition text-brand-cartext'} >
                Recipe Name 
            </label> 
            <input 
                id="recipeName" 
                type="text" 
                name="recipeName" 
                placeholder="Eg; Pasta Alfredo, Avocado Toast" 
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="border border-brand-planoff bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff" 
            /> 

        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col sm:col-span-2">
            <label  className={`mb-1 font-medium transition text-brand-cartext`}>
                Short Description                 
            </label>
            <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Select from the options..."
                className=" border border-brand-planoff bg-brand-carhead px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-planoff resize-none"
            />
        </div>

        <div className='grid grid-cols-2 gap-4 my-7'>
            {/* BASE SERVINGS */}
            <div className=''>
                <CustomSelect
                    label="Base Servings"
                    classNameLabel={"text-brand-cartext"}
                    classNameSelect={"bg-brand-carhead"}
                    options={["Bulk/Base Eg: rice, pasta, potatoes, veg, stock, water, meats", "Seasonings Eg: salt, chiles, spicy pastes", "Aromatics Eg: garlic, ginger, fresh herbs","Acids / Bitters Eg: lemon juice, vinegar", "Sugars Eg: honey in dressings", "Fats Eg: butter, oil", "Leaveners (baking) Eg: baking powder/soda", "Units Eg: eggs, bouillon cubes", "Alcohols Eg: wine, spirits", "Heat-dependent Eg: chiles, pepper"]}
                    value={baseServings}
                    onChange={(e) => setBaseServings(e.target.value)}
                />
            </div>

            {/* CALORIES */}
            <div className="flex flex-col ">
                <label htmlFor="calories" className={` relative mb-1 font-medium transition text-brand-cartext`}
                > 
                    Calories
                </label>
                <div className='relative'>
                    <input
                        id="calories" 
                        type="text" 
                        name="calories" 
                        placeholder="Enter value"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        className="border w-full border-brand-planoff bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
                    />   
                    <span className='absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium' >kcal</span>         
                </div>
            </div>

        </div>
        
        <div className='grid grid-cols-2 gap-4 my-7'>
            {/* COOKING TIME */}
            <div className="flex flex-col ">
                <label htmlFor="cookingTime" className={` relative mb-1 font-medium transition text-brand-cartext`}
                > 
                    Cooking Time
                </label>
                <div className='relative'>
                    <input
                        id="cookingTime" 
                        type="text" 
                        name="cookingTime" 
                        placeholder="Enter value"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                        className="border w-full border-brand-planoff bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
                    />   
                    <span className='absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium' >min</span>         
                </div>
            </div>

            {/* DIFFICULTY */}
            <div className=''>                
                <CustomSelect
                    label="Difficulty"
                    classNameLabel={"text-brand-cartext"}
                    classNameSelect={"bg-brand-carhead"}
                    options={["Bulk/Base Eg: rice, pasta, potatoes, veg, stock, water, meats", "Seasonings Eg: salt, chiles, spicy pastes", "Aromatics Eg: garlic, ginger, fresh herbs","Acids / Bitters Eg: lemon juice, vinegar", "Sugars Eg: honey in dressings", "Fats Eg: butter, oil", "Leaveners (baking) Eg: baking powder/soda", "Units Eg: eggs, bouillon cubes", "Alcohols Eg: wine, spirits", "Heat-dependent Eg: chiles, pepper"]}
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                />
            </div>



        </div>

        {/* NUTRITIONAL VALUE */}
        <div>
            <h3 className='text-brand-primary font-medium font-dash mb-7' >Nutritional Value</h3>
            <div className='border border-brand-planoff rounded-xl p-7' >
                {/* Fixed nutrients (first three) */}
                {fixedNutrients.map((n) => (
                    <div key={n.id} className="grid grid-cols-2 gap-4 my-7 items-center">
                    {/* Macros label - fixed */}
                    <div>
                        <label className="text-brand-cartext font-medium mb-2 block">{n.label}</label>
                        {/* If you want a select for label but fixed: use a disabled select or label only */}
                        <input
                        value={n.label}
                        disabled
                        className="border border-brand-planoff bg-brand-carhead rounded-full px-4 py-3 w-full"
                        />
                    </div>

                    {/* Value + unit */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium transition text-brand-cartext">Value</label>
                        <div className="relative">
                        <input
                            value={n.value}
                            onChange={(e) => updateFixedNutrient(n.id, { value: e.target.value })}
                            placeholder="Enter value"
                            className="border w-full border-brand-planoff bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
                        />
                        <div className="absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium">
                            <select
                            value={n.unit}
                            onChange={(e) => updateFixedNutrient(n.id, { unit: e.target.value })}
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
                    <div key={n.id} className="grid grid-cols-2 gap-4 my-7 items-center">
                    <div>
                        <label className="text-brand-cartext font-medium mb-2 block">Macros/Micros</label>
                        <input
                        value={n.label}
                        onChange={(e) => updateExtraNutrient(n.id, { label: e.target.value })}
                        placeholder="e.g. Vitamin C, Fiber"
                        className="border border-brand-planoff bg-brand-carhead rounded-full px-4 py-3 w-full"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                        <label className="mb-1 font-medium transition text-brand-cartext">Value</label>
                        <div className="relative">
                            <input
                            value={n.value}
                            onChange={(e) => updateExtraNutrient(n.id, { value: e.target.value })}
                            placeholder="Enter value"
                            className="border w-full border-brand-planoff bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
                            />
                            <div className="absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium">
                            <select
                                value={n.unit}
                                onChange={(e) => updateExtraNutrient(n.id, { unit: e.target.value })}
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

                        {/* Delete button */}
                        <button
                        type="button"
                        onClick={() => removeExtraNutrient(n.id)}
                        className="ml-2 p-2 rounded-full hover:bg-brand-planoff"
                        aria-label="Remove nutrient"
                        >
                        <X />
                        </button>
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
        <div className="flex gap-4 mt-8">
            <button
            type="button"
            onClick={handleNext}
            className="bg-brand-primary text-white rounded-full px-6 py-3 font-medium"
            >
            Next: Add Ingredient
            </button>

            <button
            type="button"
            onClick={saveAsDraft}
            className="border border-brand-planoff rounded-full px-6 py-3 font-medium bg-transparent"
            >
            Save as Draft
            </button>
        </div>

    </section>
  )
}

export default AddRecipeForm