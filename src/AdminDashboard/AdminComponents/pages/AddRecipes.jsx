import { ArrowLeft } from "lucide-react";
import StepOneBasics from "../../../Utility/StepOneBasics";
import { useEffect, useState, useRef } from "react";
import { useToast } from "../../Context/ToastProvider";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useBlocker } from "react-router-dom";
import api from "../../../Utility/api";
import StepTwoIngredients from "./StepTwoIngredients";
import StepThreeSteps from "./StepThreeSteps";
import RightPanel from "./RightPanel";
import LogoLoader from "../../../Utility/LogoLoader";

const AddRecipes = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(!!id);

  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    tags: [],
    base_servings: "",
    calories: "",
    cooking_time: "",
    difficulty: "",
    nutrition: [],
    ingredients: [],
    steps: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const isSubmittingRef = useRef(false);

  // Fetch data if in Edit Mode
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const fetchRecipe = async () => {
        try {
          const res = await api.get(`/admin/recipes/${id}`);
          const data = res.data.data;

          const unitMapping = {
            g: "gram (g)",
            ml: "milliliters (ml)",
            tbsp: "tablespoon (tbsp)",
            tsp: "teaspoon (tsp)",
            pcs: "pieces (pcs)",
            cps: "cups (cps)",
          };

          setRecipeData({
            name: data.name || "",
            description: data.description || "",
            tags: data.tags ? data.tags.map((t) => t.id) : [],
            base_servings: data.base_servings ? String(data.base_servings) : "",
            calories: data.calories ? String(data.calories) : "",
            cooking_time: data.cooking_time ? String(data.cooking_time) : "",
            difficulty: data.difficulty
              ? data.difficulty.charAt(0).toUpperCase() +
                data.difficulty.slice(1)
              : "",
            nutrition: data.nutrition
              ? data.nutrition.map((n) => ({
                  label: n.name,
                  value: String(n.value),
                  unit: n.unit,
                }))
              : [],
            ingredients: data.ingredients
              ? data.ingredients.map((i) => ({
                  id: Date.now() + Math.random(),
                  name: i.name || i.ingredient?.name || "",
                  quantity: String(i.quantity),
                  unit: unitMapping[i.unit] || i.unit,
                  ingredient_id: i.ingredient_id,
                }))
              : [],
            steps: data.steps
              ? data.steps.map((s) => ({
                  id: Date.now() + Math.random(),
                  title: s.title || "",
                  instruction: s.instruction || "",
                  time: s.time ? String(s.time) : "",
                  unit: s.unit || "minutes",
                  tip: s.tip || "",
                }))
              : [],
          });

          if (data.image_url) {
            setImagePreview(data.image_url);
          }
        } catch (error) {
          console.error("Failed to fetch recipe", error);
          showToast({
            title: "Error",
            description: "Failed to load recipe details",
            variant: "error",
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecipe();
    } else {
      setRecipeData({
        name: "",
        description: "",
        tags: [],
        base_servings: "",
        calories: "",
        cooking_time: "",
        difficulty: "",
        nutrition: [],
        ingredients: [],
        steps: [],
      });
      setImageFile(null);
      setImagePreview(null);
      setStep(1);
    }
  }, [id]);

  // Function to check if any field has input
  const hasUnsavedData = () => {
    return (
      recipeData.name ||
      recipeData.description ||
      recipeData.tags.length > 0 ||
      recipeData.base_servings ||
      recipeData.calories ||
      recipeData.cooking_time ||
      recipeData.difficulty ||
      recipeData.nutrition.length > 0 ||
      recipeData.ingredients.length > 0 ||
      recipeData.steps.length > 0
    );
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isSubmittingRef.current || !hasUnsavedData()) return;

      e.preventDefault();
      e.returnValue = ""; // Required for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [recipeData]);

  // Block navigation if there are unsaved changes
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isSubmittingRef.current &&
      hasUnsavedData() && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirm = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?",
      );
      if (confirm) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const buildPayload = (isDraft = false, data = recipeData) => ({
    ...data,
    base_servings: Number(data.base_servings),
    calories: Number(data.calories),
    cooking_time: Number(data.cooking_time),
    difficulty: data.difficulty?.toLowerCase() || "", // lowercase
    is_draft: isDraft,
    tags: data.tags.map((t) => t.id || t), // make sure it's the **ID**, not title
    nutrition: data.nutrition.map((n) => ({
      name: n.label, // rename label -> name
      value: Number(n.value), // convert string to number
      unit: n.unit,
    })),
    ingredients: data.ingredients
      .filter((i) => i.ingredient_id) // Only include ingredients with valid IDs
      .map((i) => {
        // Extract unit abbreviation from "gram (g)" -> "g"
        const unitMatch = i.unit ? i.unit.match(/\(([^)]+)\)/) : null;
        const cleanUnit = unitMatch ? unitMatch[1] : i.unit;
        return {
          ingredient_id: i.ingredient_id,
          quantity: Number(i.quantity),
          unit: cleanUnit,
        };
      }),
    steps: data.steps.map((s) => ({
      title: s.title,
      instruction: s.instruction,
      time: s.cooking_time ? parseInt(s.cooking_time, 10) : (s.time ? parseInt(s.time, 10) : 0),
      unit: s.unit,
      tip: s.tip,
    })),
  });

  const submitRecipe = async (
    isDraft = false,
    dataOverride = null,
    imageOverride = undefined,
  ) => {
    isSubmittingRef.current = true;
    try {
      const dataToUse = dataOverride || recipeData;
      const payload = buildPayload(isDraft, dataToUse);

      const formData = new FormData();

      const imageToUse =
        imageOverride !== undefined ? imageOverride : imageFile;
      if (imageToUse) formData.append("image", imageToUse);

      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("base_servings", payload.base_servings);
      formData.append("calories", payload.calories);
      formData.append("cooking_time", payload.cooking_time);
      formData.append("difficulty", payload.difficulty);
      formData.append("is_draft", payload.is_draft ? "1" : "0");

      // Append Arrays using bracket notation for FormData
      if (Array.isArray(payload.tags)) {
        payload.tags.forEach((tag) => formData.append("tags[]", tag));
      }

      // Helper to append array of objects
      const appendArrayOfObjects = (key, array) => {
        if (Array.isArray(array)) {
          array.forEach((item, index) => {
            Object.keys(item).forEach((prop) => {
              if (item[prop] !== undefined && item[prop] !== null) {
                formData.append(`${key}[${index}][${prop}]`, item[prop]);
              }
            });
          });
        }
      };

      appendArrayOfObjects("nutrition", payload.nutrition);
      appendArrayOfObjects("ingredients", payload.ingredients);
      appendArrayOfObjects("steps", payload.steps);

      let response;
      if (id) {
        formData.append("_method", "PUT"); // Spoof PUT for FormData
        response = await api.post(`/admin/recipes/${id}`, formData);
      } else {
        response = await api.post("/admin/recipes", formData);
      }

      showToast({
        title: "Success",
        description:
          response.data?.message ||
          (id ? "Recipe updated successfully" : "Recipe created successfully"),
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["recipes"] });

      navigate("/admin/recipes");
    } catch (error) {
      isSubmittingRef.current = false;
      console.error("Recipe submit failed", error);
      console.log(error.response);
      showToast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit recipe",
        variant: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-brand-primary">
        <LogoLoader />
      </div>
    );
  }

  return (
    <section className="bg-brand-background1 min-h-screen py-10 px-10 flex gap-8 ">
      {/* LEFT SECTION */}
      <div className="w-[70%]">
        {/* TITLE SECTION */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => {
                if (step === 1) {
                  navigate("/admin/recipes");
                } else {
                  prev();
                }
              }}
              className="flex items-center gap-2 text-brand-cardhead hover:text-brand-primary transition-colors cursor-pointer"
            >
              <ArrowLeft />
              Back
            </button>
            <h2 className="font-dash font-medium text-xl text-brand-primary mt-4 mb-2">
              {id ? "Edit Recipe" : "Create Recipe"}
            </h2>
            <p className="text-brand-subtext">
              {step === 1
                ? "Recipe Basics & Information"
                : step === 2
                  ? "Add Ingredients"
                  : "Add clear cooking steps in order"}
            </p>
          </div>
          <p className="font-medium text-brand-step text-sm">
            Step {step} of 3
          </p>
        </div>

        {/* FORM */}
        <div className="pt-6">
          {step === 1 && (
            <StepOneBasics
              key={id || "create"}
              initialData={recipeData}
              initialImage={imageFile}
              existingImage={imagePreview}
              onNext={(data, image) => {
                setRecipeData((prev) => ({ ...prev, ...data }));
                setImageFile(image);
                next();
              }}
              onChange={(data, image, preview) => {
                setRecipeData((prev) => ({ ...prev, ...data }));
                setImageFile(image);
                if (preview !== undefined) setImagePreview(preview);
              }}
              onSaveDraft={(data, image) => {
                setRecipeData((prev) => ({ ...prev, ...data }));
                setImageFile(image);
                submitRecipe(true, data, image); // <- pass fresh data directly
              }}
            />
          )}

          {step === 2 && (
            <StepTwoIngredients
              initialIngredients={recipeData.ingredients}
              onNext={(ingredients) => {
                setRecipeData((prev) => ({ ...prev, ingredients }));
                next();
              }}
              onChange={(ingredients) => {
                setRecipeData((prev) => ({ ...prev, ingredients }));
              }}
              onSaveDraft={() => submitRecipe(true)}
            />
          )}
          {step === 3 && (
            <StepThreeSteps
              initialSteps={recipeData.steps}
              onChange={(steps) => {
                setRecipeData((prev) => ({ ...prev, steps }));
              }}
              onSubmit={(steps) => {
                setRecipeData((prev) => ({ ...prev, steps }));
                submitRecipe(false, { ...recipeData, steps });
              }}
              onSaveDraft={() => submitRecipe(true)}
            />
          )}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-[30%]">
        <RightPanel step={step} data={recipeData} imagePreview={imagePreview} />
      </div>
    </section>
  );
};

export default AddRecipes;
