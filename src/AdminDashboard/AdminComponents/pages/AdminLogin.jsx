import Image from '../../../assets/LoginImg.png'
import FooterLogo from '../../../assets/FooterLogo.svg'
import Eye from '../../../assets/Eye.svg'
import { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../Context/ToastProvider';

const AdminLogin = () => {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await login(form.email, form.password);

        showToast({
        title: "Success",
        description: response.message, // 👈 dynamic API message
        variant: "success",
        });

        navigate("/admin/dashboard");
    } catch (err) {
        showToast({
        title: "Login failed",
        description:
            err.response?.data?.message || "Invalid credentials",
        variant: "error",
        });
    } finally {
        setLoading(false);
    }
    };


  return (
    <section className='p-6 sm:p-10 rounded-2xl w-full max-w-md mx-auto' >

        <div>
            <h2 className='font-semibold font-dash text-3xl sm:text-4xl text-brand-primary mb-8 sm:mb-12 text-center sm:text-left'  >
                Sign In to the Admin Console
            </h2>
            <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1 font-medium text-brand-cartext text-base sm:text-lg">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="johndoe@gmail.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border border-brand-planoff rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff text-sm sm:text-base"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col relative">
                    <label className="mb-1 font-medium text-brand-cartext text-base sm:text-lg">Password</label>

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="**************"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="border border-brand-planoff rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff pr-12 text-sm sm:text-base"
                    />

                    {/* Eye Icon */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[70%] -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                        {showPassword ? <img src={Eye} className="w-5 h-5" /> : <img src={Eye} className="w-5 h-5" />}
                    </button>
                </div>
                <Link to="/admin/forgot-password" className='text-brand-secondary font-medium text-sm sm:text-base' >
                    Reset Password?
                </Link>

                <button
                    type="submit"
                    disabled={loading}
                    className={`py-3 rounded-full font-bold mt-6 sm:mt-8 w-full text-white text-sm sm:text-base
                        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-brand-secondary"}
                    `}
                >
                    {loading ? "Signing in..." : "Log In"}
                </button>

            </form>
        </div>

    </section>
  )
}

export default AdminLogin