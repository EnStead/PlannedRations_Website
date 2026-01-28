import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import api from "../../../Utility/api";
import { useToast } from "../../Context/ToastProvider";

const ResetPasswordModal = ({ open, onOpenChange, user }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      const res = await api.post(
        `/admin/reset-user-password/${user.id}`
      );

      showToast({
        title: res.data.message,          // "Operation successful"
        description: res.data.data,       // "Temporary password sent to user"
        variant: "success",
      });

      onOpenChange(false);
    } catch (err) {
      showToast({
        title: "Error",
        description:
          err.response?.data?.message || "Failed to reset password",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />

        {/* Modal */}
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-[420px]
          -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-lg">

            {/* Header */}
            <Dialog.Title className="text-lg font-dash text-brand-primary text-center font-semibold">
                Reset password for this user?
            </Dialog.Title>

            <Dialog.Close asChild>
                <button className="text-gray-500 absolute top-7 right-7 hover:text-gray-700">
                <X size={20} />
                </button>
            </Dialog.Close>

            <Dialog.DialogDescription>

            </Dialog.DialogDescription>   

          {/* Body */}

          <p className="text-sm font-light text-brand-subtext mb-6 text-center">
            A temporary password has been sent to{" "}
            <span className="font-medium text-brand-midtext">
              {user?.email}
            </span>
            . The user will need to log in with it and update this to a new
            password.
          </p>

          {/* Actions */}
          <div className="flex justify-center gap-3">
            <Dialog.Close asChild>
              <button
                disabled={loading}
                className="px-8 py-2 text-brand-subtext rounded-full border text-sm"
              >
                Cancel
              </button>
            </Dialog.Close>

            <button
              onClick={handleReset}
              disabled={loading}
              className={`px-4 py-2 rounded-full font-bold text-white text-sm
                ${loading ? "bg-gray-400" : "bg-brand-secondary"}
              `}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ResetPasswordModal;
