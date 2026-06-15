import * as Dialog from "@radix-ui/react-dialog";
import { Check, ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import api from "./api";

const AllergyModal = ({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [form, setForm] = useState({
    name: "",
    tag_ids: [],
    description: "",
  });
  const [availableTags, setAvailableTags] = useState([]);
  const [tagsOpen, setTagsOpen] = useState(false);
  const tagsRef = useRef(null);

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      const initialTagIds = Array.isArray(initialValues.tags)
        ? initialValues.tags
            .map((tag) => tag?.id ?? tag?.tag_id ?? null)
            .filter((id) => id !== null && id !== undefined)
            .map(String)
        : Array.isArray(initialValues.tag_ids)
          ? initialValues.tag_ids.map(String)
          : [];

      setForm({
        name: initialValues.name || "",
        tag_ids: initialTagIds,
        description: initialValues.description || "",
      });
    } else {
      setForm({
        name: "",
        tag_ids: [],
        description: "",
      });
    }
  }, [mode, initialValues, open]);

  useEffect(() => {
    if (!open) return;

    const fetchTags = async () => {
      try {
        const res = await api.get("/admin/tags/list/all?applies_to=recipe");
        setAvailableTags(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (error) {
        console.error("Failed to fetch tags for allergy modal", error);
        setAvailableTags([]);
      }
    };

    fetchTags();
  }, [open]);

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
    const normalizedId = String(tagId);
    setForm((prev) => {
      const exists = prev.tag_ids.includes(normalizedId);
      return {
        ...prev,
        tag_ids: exists
          ? prev.tag_ids.filter((id) => id !== normalizedId)
          : [...prev.tag_ids, normalizedId],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const selectedTagNames = availableTags
    .filter((tag) => form.tag_ids.includes(String(tag.id)))
    .map((tag) => tag.title)
    .join(", ");

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed z-60 top-1/2 left-1/2 w-[90%] max-w-[540px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">
          <Dialog.Title className="text-xl text-center font-dash font-medium mb-1">
            {mode === "add" ? "Add Allergies" : "Edit Allergy"}
          </Dialog.Title>
          <Dialog.Description className="font-light text-brand-subtext text-center mb-6">
            {mode === "add"
              ? "Add food allergens to your library"
              : "Update food allergy details"}
          </Dialog.Description>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X />
            </button>
          </Dialog.Close>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                className={`mb-1 font-medium ${
                  form.name ? "text-brand-primary" : "text-brand-muted"
                }`}
              >
                Allergy Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Eg; Dairy, Nut, Shellfish..."
                required
                className={`border ${
                  form.name ? "border-brand-primary" : "border-brand-planoff"
                } rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-primary`}
              />
            </div>

            <div className="flex flex-col relative" ref={tagsRef}>
              <label
                className={`mb-1 font-medium ${
                  form.tag_ids.length > 0
                    ? "text-brand-primary"
                    : "text-brand-muted"
                }`}
              >
                Add Tags
              </label>
              <button
                type="button"
                onClick={() => setTagsOpen((prev) => !prev)}
                className={`border ${
                  form.tag_ids.length > 0
                    ? "border-brand-primary"
                    : "border-brand-planoff"
                } bg-brand-carhead rounded-xl px-4 py-3 flex justify-between items-center focus:outline-none`}
              >
                <span
                  className={`truncate text-left ${
                    form.tag_ids.length > 0
                      ? "text-brand-primary"
                      : "text-brand-cartext"
                  }`}
                >
                  {selectedTagNames || "Search for one or more tags..."}
                </span>
                <ChevronDown size={18} />
              </button>

              {tagsOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-brand-planoff rounded-xl shadow-lg z-[70] max-h-60 overflow-y-auto p-2">
                  {availableTags.length > 0 ? (
                    availableTags.map((tag) => (
                      <div
                        key={tag.id}
                        onClick={() => toggleTag(tag.id)}
                        className="flex items-center justify-between px-4 py-2 hover:bg-brand-secondary/30 rounded-lg cursor-pointer transition"
                      >
                        <span className="text-brand-subtext">
                          {tag.title}
                        </span>
                        {form.tag_ids.includes(String(tag.id)) && (
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

            <div className="flex flex-col">
              <label
                className={`mb-1 font-medium ${
                  form.description ? "text-brand-primary" : "text-brand-muted"
                }`}
              >
                Short Description (Optional)
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={4}
                placeholder="Type Tips or description of allergy..."
                className={`border ${
                  form.description ? "border-brand-primary" : "border-brand-planoff"
                } rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-brand-primary`}
              />
            </div>

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
                  ? "Save Allergy"
                  : "Update Allergy"}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AllergyModal;
