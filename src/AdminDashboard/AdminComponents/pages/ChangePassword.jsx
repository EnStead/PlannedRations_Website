import React, { useEffect, useState } from 'react'
import Eye from '../../../assets/Eye.svg'
import { useAuth } from '../../Context/AuthContext';
import { useToast } from '../../Context/ToastProvider';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const { resetPassword, resetData, clearResetData } = useAuth();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ password: "", password_confirmation: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.password_confirmation) {
        showToast({
            title: "Password mismatch",
            description: "Passwords do not match",
            variant: "error",
        });
        return;
        }
        setLoading(true);

        try {
        const res = await resetPassword({
        email: resetData.email,
        token: resetData.token,
        password: form.password,
        password_confirmation: form.password_confirmation,
        });


        if (res.success) {
            clearResetData
            showToast({
            title: "Password Changed",
            description: res.message,
            variant: "success",
            });
            // optionally redirect to login page
            navigate("/admin");
        } else {
            showToast({
            title: "Error",
            description: res.message,
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
    }

    useEffect(() => {
    const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    }, []);


    if (!resetData?.token || !resetData?.email) {
    return <p>Invalid or expired session</p>;
    }



  return (
    <div className="p-10 ">
        <h2 className="font-semibold font-dash text-4xl text-brand-primary mb-6">
            Change Your Password
        </h2>

        <p className="text-brand-subtext mb-8">
            Change your password below to set a new one.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {["password", "password_confirmation"].map((field, index) => (
            <div key={field} className="flex flex-col relative">
                <label className="mb-1 font-medium text-brand-cartext">
                {field === "password" ? "Password" : "Confirm Password"}
                </label>
                <input
                type={showPassword ? "text" : "password"}
                name={field}
                placeholder="**************"
                value={form[field]}
                onChange={handleChange}
                required
                className="border border-brand-planoff rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff pr-12"
                />
                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[70%] -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                <img src={Eye} alt="toggle" />
                </button>
            </div>
            ))}

            <button
                type="submit"
                disabled={loading}
                className={`py-3 rounded-full font-bold mt-4 text-white
                    ${loading ? "bg-gray-400" : "bg-brand-secondary"}
                `}
            >
                {loading ? "Changing..." : "Change Password"}
            </button>
        </form>
    </div>
  )
}

export default ChangePassword