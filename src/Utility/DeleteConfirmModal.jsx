// DeleteConfirmModal.jsx
const DeleteConfirmModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[99999]">
      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="text-xl font-medium text-brand-primary mb-2 text-center">
          Delete Ingredient
        </h2>

        <p className="text-sm text-brand-subtext text-center mb-8">
          Are you certain you want to delete this ingredient? Once removed, it will no longer appear in any recipes it was associated with.
        </p>

        <div className="flex justify-between gap-4">
        {/* Cancel */}
        <button
            onClick={onClose}
            className="
            flex-1 
            border 
            border-brand-planoff 
            rounded-full 
            py-2 
            cursor-pointer
            transition 
            hover:bg-brand-primary
            hover:border-brand-carhead
            hover:text-brand-carhead
            "
        >
            Cancel
        </button>

        {/* Revoke */}
        <button
            onClick={onConfirm}
            className="
            flex-1 
            bg-brand-red 
            text-white 
            rounded-full 
            py-2 
            cursor-pointer
            transition
            hover:bg-brand-red/80 
            hover:text-white
            "
        >
            Revoke Access
        </button>
        </div>


      </div>
    </div>
  );
};

export default DeleteConfirmModal;
