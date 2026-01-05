import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useToast } from "../../Context/ToastProvider";
import api from "../../../Utility/api";

const OTPModal = ({ open, setOpen, email, onVerified }) => {
  const { showToast } = useToast();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      showToast({
        title: "Incomplete OTP",
        description: "Please enter all 4 digits",
        variant: "error",
      });
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post("/admin/verify-otp", { email, otp: enteredOtp });
      if (response.data.success) {
        const token = response.data.data.token;

        showToast({
            title: "OTP Verified",
            description: "You can now reset your password",
            variant: "success",
        });

        setOtp(["", "", "", ""]);
        setOpen(false);

        // 🔑 pass token back
        onVerified(token);


      } else {
        console.log(response)
        showToast({
          title: "OTP Failed",
          description: response.data.message,
          variant: "error",
        });
      }
    } catch (err) {
      showToast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-8 text-center">
          <Dialog.Title className="text-2xl font-semibold mb-4">Enter OTP</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mb-6">
            We sent a 4-digit verification code to <span className="font-medium">{email}</span>
          </Dialog.Description>

          <div className="flex justify-between gap-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength={1}
                className="w-14 h-14 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`py-3 rounded-full w-full text-white font-bold ${
              loading ? "bg-gray-400" : "bg-brand-secondary"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <Dialog.Close className="mt-4 text-sm text-gray-500 underline">
            Cancel
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OTPModal;
