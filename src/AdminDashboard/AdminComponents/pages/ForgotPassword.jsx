import { useState } from "react";
import { useToast } from "../../Context/ToastProvider";
import { useAuth } from "../../Context/AuthContext";
import OTPModal from "./OTPModal";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const { forgotPassword, setPasswordResetData } = useAuth();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const [otpOpen, setOtpOpen] = useState(false);
    const navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await forgotPassword(email); // ✅ dynamic API call

      showToast({
        title: "Success",
        description: response.message, // 👈 dynamic message from backend
        variant: "success",
      });

      setOtpOpen(true); // open Radix OTP modal
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

    const handleOtpVerified = (token) => {
        setPasswordResetData({
            email,
            token,
        });

        navigate("/admin/change-password");
    };

  return (
    <div className="p-10 ">
      <h2 className="font-semibold font-dash text-4xl text-brand-primary mb-6">
        Reset Your Password
      </h2>

      <p className="text-brand-subtext mb-8">
        Please provide your email address below, and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-brand-planoff rounded-full px-4 py-3"
        />

        <button
          type="submit"
          disabled={loading}
          className={`py-3 rounded-full font-bold mt-4 text-white
            ${loading ? "bg-gray-400" : "bg-brand-secondary"}
          `}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <OTPModal
        open={otpOpen}
        setOpen={setOtpOpen}
        email={email}
        onVerified={handleOtpVerified}
      />
    </div>
  );
};

export default ForgotPassword;
