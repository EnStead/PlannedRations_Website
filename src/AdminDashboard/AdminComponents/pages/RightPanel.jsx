import RecipeImg from "../../../assets/RecipeImg.png";

const RightPanel = ({ step, data, imagePreview }) => {
  return (
    <div className="bg-white  rounded-lg border border-brand-planoff sticky top-10">
      {step === 1 && (
        <>
          {/* Image Preview */}
          <div className="w-full h-48 bg-brand-offwhite rounded-t-lg overflow-hidden mb-6">
            <img
              src={imagePreview || RecipeImg}
              alt="Recipe Preview"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Description */}
          <div className="mb-6 px-4">
            <h2 className="font-dash font-bold text-2xl text-brand-primary mb-2 break-words">
              {data?.name || "Recipe Title Here..."}
            </h2>
            <p className="text-sm text-brand-subtext font-light break-words line-clamp-3">
              {data?.description || "Short description of recipe goes here...."}
            </p>
          </div>

          {/* Meta Info */}
          <div className="px-4 pb-6">
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b text-center border-brand-planoff mb-6">
              <div>
                <p className="font-medium text-brand-primary">
                  {data?.base_servings || "0"}
                </p>
                <p className="text-xs text-brand-muted mb-1">Base Serving</p>
              </div>
              <div>
                <p className="font-medium text-brand-primary">
                  {data?.cooking_time || "0"} min
                </p>
                <p className="text-xs text-brand-muted mb-1">Cooking Time</p>
              </div>
              <div>
                <p className="font-medium text-brand-primary">
                  {data?.calories || "0"} kcal
                </p>
                <p className="text-xs text-brand-muted mb-1">Calories</p>
              </div>
            </div>

            <h3 className="font-dash font-medium text-brand-primary mb-2 break-words">
              Nutritional Value
            </h3>

            <div className="space-y-2">
              {data?.nutrition?.length > 0 ? (
                data.nutrition.map((n, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm border-b border-brand-planoff py-2 last:border-0"
                  >
                    <span className="text-brand-subtext">{n.label}</span>
                    <span className="font-medium text-brand-primary">
                      {n.value} {n.unit}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-brand-muted italic">
                  Nutritional values will appear here...
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Step 2: Ingredients Preview */}
      {step === 2 && (
        <div className="">
          <div className="w-full h-18 bg-brand-offwhite rounded-t-lg overflow-hidden mb-6">
            <img
              src={RecipeImg}
              alt="Recipe Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-dash font-medium text-lg px-4 text-brand-primary mb-4">
            Ingredients List
          </h4>
          {data?.ingredients?.length > 0 ? (
            <ul className="space-y-3 px-4">
              {data.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="text-sm text-brand-subtext flex justify-between items-center border-b border-brand-planoff pb-2 last:border-0"
                >
                  <span>{ing.name}</span>
                  <span className="font-medium text-brand-primary">
                    {ing.quantity} {ing.unit}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-brand-muted italic">
              Ingredients will appear here...
            </p>
          )}
        </div>
      )}

      {/* Step 3: Instructions Preview */}
      {step === 3 && (
        <div className="">
          <div className="w-full h-18 bg-brand-offwhite rounded-t-lg overflow-hidden mb-6">
            <img
              src={RecipeImg}
              alt="Recipe Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-dash font-medium text-lg px-4 text-brand-primary mb-4">
            Cooking Steps
          </h4>
          {data?.steps?.length > 0 ? (
            <div className="space-y-6 mx-4 mb-3 px-2 py-2 rounded-lg bg-brand-offwhite">
              {data.steps.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-dash font-medium text-brand-primary">
                        {s.title || `Step title here...`}
                      </p>

                      <span className="flex-shrink-0 font-dash font-medium text-brand-muted text-xs flex items-center justify-center mt-0.5 ">
                        Step {i + 1}
                      </span>
                    </div>
                    <ul className="list-disc ml-4 text-xs text-brand-subtext leading-relaxed">
                      <li>{s.instruction || "Instruction goes here..."}</li>
                    </ul>
                    {s.tip && (
                      <div className="mt-2 ">
                        <p className="text-xs text-brand-subtext italic">
                          {s.tip || "Tips goes here..."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-brand-muted italic">
              Cooking steps will appear here...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RightPanel;
