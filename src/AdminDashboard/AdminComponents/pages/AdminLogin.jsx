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
    <section className=' p-10 rounded-2xl' >

        <div>
            <h2 className='font-semibold font-dash text-4xl text-brand-primary mb-12'  >
                Sign In to the Admin Console
            </h2>
            <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1 font-medium text-brand-cartext text-lg">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="johndoe@gmail.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border border-brand-planoff rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col relative">
                    <label className="mb-1 font-medium text-brand-cartext">Password</label>

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="**************"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="border border-brand-planoff rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff pr-12"
                    />

                    {/* Eye Icon */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[70%] -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                        {showPassword ? <img src={Eye} /> : <img src={Eye} />}
                    </button>
                </div>
                <Link to="/admin/forgot-password" className='text-brand-secondary font-medium' >
                    Reset Password?
                </Link>

                <button
                    type="submit"
                    disabled={loading}
                    className={`py-3 rounded-full font-bold mt-8 w-full text-white
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