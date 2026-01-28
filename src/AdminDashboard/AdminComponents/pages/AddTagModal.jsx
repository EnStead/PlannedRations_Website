import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { X, ChevronDown, Check } from "lucide-react";
import { useEffect, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import api from "../../../Utility/api";

const APPLY_OPTIONS = [
  { label: "Recipes", value: "recipe" },
  { label: "Blogs & Articles", value: "post" },
  { label: "Challenges", value: "challenge" },
  { label: "Badges", value: "badge" },
];

const AddTagModal = ({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    sub_category: "",
    description: "",
    applies_to: [],
    good_for: "",
  });
  const [taxonomy, setTaxonomy] = useState([]);
  const [loadingTaxonomy, setLoadingTaxonomy] = useState(false);

  /* -------------------- PREFILL (EDIT MODE) -------------------- */
  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setForm({
        title: initialValues.title ?? "",
        category: initialValues.category ?? "",
        sub_category: initialValues.sub_category ?? "",
        description: initialValues.description ?? "",
        applies_to: initialValues.applies_to ?? [],
        good_for:
          initialValues.good_for !== undefined && initialValues.good_for !== null
            ? initialValues.good_for ? "true" : "false"
            : "",
      });
    } else {
      setForm({
        title: "",
        category: "",
        sub_category: "",
        description: "",
        applies_to: [],
        good_for: "",
      });
    }
  }, [mode, initialValues, open]);

  useEffect(() => {
    const fetchTaxonomy = async () => {
      try {
        setLoadingTaxonomy(true);
        const res = await api.get("/admin/tags/taxonomy/all");
        setTaxonomy(res.data.data);
      } catch (err) {
        console.error("Failed to fetch taxonomy", err);
      } finally {
        setLoadingTaxonomy(false);
      }
    };

    fetchTaxonomy();
  }, []);

  const categories = Object.keys(taxonomy);

  const subCategories =
    form.category && taxonomy[form.category] ? taxonomy[form.category] : [];

  const toggleApply = (value) => {
    setForm((prev) => ({
      ...prev,
      applies_to: prev.applies_to.includes(value)
        ? prev.applies_to.filter((v) => v !== value)
        : [...prev.applies_to, value],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      good_for: form.good_for === "true",
    }); // 🔥 backend-ready payload
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onClose}>
        <Dialog.Portal>
          {/* Overlay */}
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />

          {/* Modal */}
          <Dialog.Content className="fixed z-60 top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">
            <Dialog.Title className="text-xl text-center font-dash font-medium mb-1">
              {mode === "add" ? "Add Tags" : "Edit Tags"}
            </Dialog.Title>

            <Dialog.DialogDescription className="font-light text-brand-subtext text-center">
              {mode === "add" ? "Add tags for your content" : "Edit your tags"}
            </Dialog.DialogDescription>

            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 text-gray-500 hover:text-black">
                <X />
              </button>
            </Dialog.Close>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* -------------------- TAG NAME -------------------- */}
              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <label
                    className={`mb-1 font-medium ${form.title?.trim() !== "" ? "text-brand-primary" : "text-brand-muted"}`}
                  >
                    Tag Name
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Eg: Diasafe, Preggo"
                    required
                    className={`border ${form.title?.trim() !== "" ? "border-brand-primary" : "border-brand-planoff"} rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-primary`}
                  />
                </div>

                {/* -------------------- GOOD FOR -------------------- */}
                <div className="w-full">
                  <label
                    className={`mb-1 font-medium ${form.good_for ? "text-brand-primary" : "text-brand-muted"}`}
                  >
                    Good For
                  </label>
                  <Select.Root
                    value={form.good_for}
                    onValueChange={(v) => setForm((prev) => ({ ...prev, good_for: v }))}
                  >
                    <Select.Trigger
                      className={`border ${form.good_for ? "border-brand-primary" : "border-brand-planoff"} w-full flex justify-between items-center rounded-xl px-4 py-3`}
                    >
                      <Select.Value placeholder="Select option" />
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content className="bg-white rounded-md shadow border z-[60]">
                        <Select.Viewport className="p-1">
                          {["true", "false"].map((opt) => (
                            <Select.Item key={opt} value={opt} className="px-8 py-2 text-sm cursor-pointer hover:bg-brand-secondary/10 capitalize">
                              <Select.ItemText>{opt}</Select.ItemText>
                              <Select.ItemIndicator className="absolute left-2">
                                <Check className="h-4 w-4" />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </div>

              {/* -------------------- CATEGORY -------------------- */}
              <div className="flex gap-4">
                <div className="w-full">
                  <label
                    className={`mb-1 font-medium ${form.category?.trim() !== "" ? "text-brand-primary" : "text-brand-muted"}`}
                  >
                    Category
                  </label>
                  <Select.Root
                    value={form.category}
                    onValueChange={(v) =>
                      setForm((prev) => ({
                        ...prev,
                        category: v,
                        sub_category: "", // reset on category change
                      }))
                    }
                  >
                    <Select.Trigger
                      className={`border ${form.category ? "border-brand-primary" : "border-brand-planoff"} w-full flex justify-between items-center rounded-xl px-4 py-3`}
                    >
                      <Select.Value placeholder="Select category" />
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content className="bg-white rounded-md shadow border z-[60]">
                        <Select.Viewport className="p-1">
                          {categories.map((opt) => (
                            <Select.Item
                              key={opt}
                              value={opt}
                              className="px-8 py-2 text-sm cursor-pointer hover:bg-brand-secondary/10"
                            >
                              <Select.ItemText>{opt}</Select.ItemText>
                              <Select.ItemIndicator className="absolute left-2">
                                <Check className="h-4 w-4" />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>

                {/* -------------------- SUB CATEGORY -------------------- */}

                <div className="w-full">
                  <label
                    className={`mb-1 font-medium ${form.sub_category?.trim() !== "" ? "text-brand-primary" : "text-brand-muted"}`}
                  >
                    Sub Category
                  </label>
                  <Select.Root
                    value={form.sub_category}
                    disabled={!form.category}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, sub_category: v }))
                    }
                  >
                    <Select.Trigger
                      className={`border w-full flex justify-between items-center rounded-xl px-4 py-3
                      ${!form.category ? "opacity-50 cursor-not-allowed" : ""}
                      ${form.sub_category ? "border-brand-primary" : "border-brand-planoff"}
                    `}
                    >
                      <Select.Value placeholder="Select category" />
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content className="bg-white rounded-md shadow border z-[60]">
                        <Select.Viewport className="p-1">
                          {subCategories.map((opt) => (
                            <Select.Item
                              key={opt}
                              value={opt}
                              className="px-8 py-2 text-sm cursor-pointer hover:bg-brand-secondary/10"
                            >
                              <Select.ItemText>{opt}</Select.ItemText>
                              <Select.ItemIndicator className="absolute left-2">
                                <Check className="h-4 w-4" />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </div>

              {/* -------------------- DESCRIPTION -------------------- */}
              <div>
                <label
                  className={`mb-1 block font-medium ${form.description?.trim() !== "" ? "text-brand-primary" : "text-brand-muted"}`}
                >
                  Short Description (Optional)
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  className={`border ${form.description?.trim() !== "" ? "border-brand-primary" : "border-brand-planoff"} rounded-xl px-4 py-3 w-full resize-none focus:outline-none focus:ring-1 focus:ring-brand-primary`}
                />
              </div>

              {/* -------------------- APPLIES TO (RADIX CHECKBOX) -------------------- */}
              <div>
                <p className="font-medium mb-2 text-brand-muted">
                  What can this tag apply to?
                </p>

                <div className="space-y-2">
                  {APPLY_OPTIONS.map(({ label, value }) => (
                    <label
                      key={value}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox.Root
                        checked={form.applies_to.includes(value)}
                        onCheckedChange={() => toggleApply(value)}
                        className="h-5 w-5 rounded border border-gray-400 flex items-center justify-center data-[state=checked]:bg-brand-secondary"
                      >
                        <Checkbox.Indicator>
                          <Check className="h-4 w-4 text-white" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* -------------------- SUBMIT -------------------- */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 rounded-full bg-brand-secondary font-bold text-white hover:opacity-90 disabled:opacity-60"
              >
                {loading
                  ? mode === "add"
                    ? "Saving..."
                    : "Updating..."
                  : mode === "add"
                    ? "Create Tag"
                    : "Update Tag"}
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default AddTagModal;
