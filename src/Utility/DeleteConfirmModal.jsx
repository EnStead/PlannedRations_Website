// DeleteConfirmModal.jsx
const DeleteConfirmModal = ({ open, onClose, onConfirm, loading }) => {
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
          <button
            onClick={onClose}
            disabled={loading}
            className="
              flex-1 border border-brand-planoff rounded-full py-2
              transition
              hover:bg-brand-primary hover:border-brand-carhead hover:text-brand-carhead
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              flex-1 bg-brand-red text-white rounded-full py-2
              transition
              hover:bg-brand-red/80
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
          >
            {loading && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Removing..." : "Yes, Remove"}
          </button>

        </div>


      </div>
    </div>
  );
};

export default DeleteConfirmModal;
