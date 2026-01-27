import { useState, useEffect, useRef } from "react";
import { ArrowUp, ArrowDown, Plus, Trash2 } from "lucide-react";
import PublishConfirmModal from "../../../Utility/PublishConfirmModal";

const TIME_UNITS = ["sec", "min", "hours", "days"];

const StepThreeInstructions = ({
  onSubmit,
  onSaveDraft,
  onChange,
  initialSteps,
}) => {
  const [steps, setSteps] = useState(
    initialSteps?.length > 0
      ? initialSteps
      : [
          {
            id: Date.now(),
            title: "",
            time: "",
            unit: "",
            instruction: "",
            tip: "",
          },
        ],
  );
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onChangeRef.current?.(steps);
  }, [steps]);

  /* -------------------- MOVE STEP -------------------- */
  const moveStep = (index, direction) => {
    const updated = [...steps];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= steps.length) return;

    [updated[index], updated[targetIndex]] = [
      updated[targetIndex],
      updated[index],
    ];

    setSteps(updated);
  };

  /* -------------------- UPDATE STEP -------------------- */
  const updateStep = (index, field, value) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  /* -------------------- ADD STEP -------------------- */
  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: Date.now(),
        title: "",
        time: "",
        unit: "",
        instruction: "",
        tip: "",
      },
    ]);
  };

  /* -------------------- REMOVE STEP -------------------- */
  const removeStep = (index) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    } else {
      setSteps([
        {
          id: Date.now(),
          title: "",
          time: "",
          unit: "",
          instruction: "",
          tip: "",
        },
      ]);
    }
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = (isDraft = false) => {
    const cleanedSteps = steps.map((s, index) => ({
      order: index + 1,
      title: s.title,
      cooking_time: s.time,
      unit: s.unit,
      instruction: s.instruction,
      tip: s.tip,
    }));

    isDraft ? onSaveDraft(cleanedSteps) : onSubmit(cleanedSteps);
  };

  return (
    <section className="space-y-6">
      {steps.map((step, index) => (
        <div key={step.id} className="border border-brand-planoff rounded-xl ">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4 border-b p-4 rounded-t-xl bg-white border-brand-planoff">
            <div className="flex items-center gap-3">
              <div className="flex gap-3">
                <button
                  onClick={() => moveStep(index, "up")}
                  disabled={index === 0}
                  className="disabled:opacity-30"
                >
                  <ArrowUp size={18} />
                </button>
                <button
                  onClick={() => moveStep(index, "down")}
                  disabled={index === steps.length - 1}
                  className="disabled:opacity-30"
                >
                  <ArrowDown size={18} />
                </button>
              </div>
              <h3 className="font-medium text-brand-primary font-park">
                Step {index + 1}
              </h3>
            </div>
            <button
              onClick={() => removeStep(index)}
              className="text-brand-red hover:bg-red-50 p-2 rounded-full transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="p-6">
            {/* TITLE + TIME */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label
                  className={`mb-1 font-medium transition ${step.title ? "text-brand-primary" : "text-brand-cartext"}`}
                >
                  Title
                </label>
                <input
                  value={step.title}
                  onChange={(e) => updateStep(index, "title", e.target.value)}
                  placeholder="Type Step Title here..."
                  className={`w-full border ${step.title ? "border-brand-primary" : "border-brand-planoff"} bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff`}
                />
              </div>

              <div>
                <label
                  className={`mb-1 font-medium transition ${step.time ? "text-brand-primary" : "text-brand-cartext"}`}
                >
                  Cooking Time
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={step.time}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) updateStep(index, "time", val);
                    }}
                    placeholder="0"
                    className={`w-full border ${step.time ? "border-brand-primary" : "border-brand-planoff"} bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <select
                      value={step.unit}
                      onChange={(e) =>
                        updateStep(index, "unit", e.target.value)
                      }
                      className="bg-transparent text-brand-subtext font-medium focus:outline-none cursor-pointer"
                    >
                      {TIME_UNITS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* INSTRUCTION */}
            <div className="mb-4 flex flex-col">
              <label
                className={`mb-1 font-medium transition ${step.instruction ? "text-brand-primary" : "text-brand-cartext"}`}
              >
                Instruction
              </label>
              <textarea
                value={step.instruction}
                onChange={(e) =>
                  updateStep(index, "instruction", e.target.value)
                }
                rows={4}
                placeholder="Type instructions here. Press Enter for new line..."
                className={`w-full border ${step.instruction ? "border-brand-primary" : "border-brand-planoff"} bg-brand-carhead rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff resize-none`}
              />
            </div>

            {/* TIP */}
            <div className="flex flex-col">
              <label
                className={`mb-1 font-medium transition ${step.tip ? "text-brand-primary" : "text-brand-cartext"}`}
              >
                Tip (optional)
              </label>
              <input
                value={step.tip}
                onChange={(e) => updateStep(index, "tip", e.target.value)}
                placeholder="Type extras here..."
                className={`w-full border ${step.tip ? "border-brand-primary" : "border-brand-planoff"} bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff`}
              />
            </div>
          </div>
        </div>
      ))}

      {/* ADD STEP */}
      <button
        onClick={addStep}
        className="flex items-center gap-2 text-brand-secondary font-medium"
      >
        <Plus />
        Add Step
      </button>

      {/* ACTIONS */}
      <div className="mt-10">
        <div className="flex justify-between  gap-4">
          <button
            onClick={() => setPublishModalOpen(true)}
            className="px-18 py-3 rounded-full bg-brand-secondary text-white font-bold"
          >
            Publish
          </button>
          <button
            onClick={() => handleSubmit(true)}
            className="text-brand-primary rounded-full px-16 py-3 font-bold border hover:bg-brand-primary hover:text-white transition"
          >
            Save As Draft
          </button>
        </div>
      </div>

      <PublishConfirmModal
        open={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        onConfirm={() => {
          setPublishModalOpen(false);
          handleSubmit(false);
        }}
        title="Ready to Publish this Recipe?"
        subtext="Publishing this recipe will make it visible to all users in the app. Please verify the ingredients, portions, and cooking steps before proceeding."
        actionBtn="Publish Now"
      />
    </section>
  );
};

export default StepThreeInstructions;
