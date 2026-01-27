import * as Dialog from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const UserDeleteModal = ({
  open,
  onClose,
  onConfirm,
  loading,
  title,
  subtext,
  isFamily,
}) => {
  const [deleteFamily, setDeleteFamily] = useState(false);

  const handleConfirm = () => {
    onConfirm(deleteFamily);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl focus:outline-none">
          <Dialog.Title className="text-xl font-medium text-center font-dash mb-2">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-center text-brand-subtext text-sm mb-6">
            {subtext}
          </Dialog.Description>

          {isFamily && (
            <div className="flex items-center justify-center gap-2 mb-6 bg-brand-background1 p-3 rounded-lg border border-brand-planoff">
              <input
                type="checkbox"
                id="deleteFamily"
                checked={deleteFamily}
                onChange={(e) => setDeleteFamily(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-brand-secondary focus:ring-brand-secondary cursor-pointer"
              />
              <label
                htmlFor="deleteFamily"
                className="text-sm text-brand-primary cursor-pointer select-none font-medium"
              >
                Also delete connected family members
              </label>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => onClose()}
              disabled={loading}
              className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 py-2.5 rounded-full bg-brand-red text-white font-medium hover:opacity-90 transition disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              Delete Account
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UserDeleteModal;