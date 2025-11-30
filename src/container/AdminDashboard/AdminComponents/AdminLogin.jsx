import Image from '../../../assets/LoginImg.png'
import FooterLogo from '../../../assets/FooterLogo.svg'
import Eye from '../../../assets/Eye.svg'
import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     login({ name: "Admin User", email: form.email, isAdmin: true });
    navigate("/admin/dashboard");
  };

  return (
    <section className=' p-10 rounded-2xl' >
        <div className='flex h-[90vh]'>
            <div className="bg-brand-purpbg w-[50%] relative flex flex-col justify-center pt-20 pl-20 rounded-2xl">
                <div className="flex justify-start">
                    <img src={FooterLogo} alt="Logo" />
                </div>

                <div className="w-full flex justify-end items-center overflow-hidden">
                    <img 
                        src={Image} 
                        alt="Image" 
                        className="object-contain"
                    />
                </div>
            </div>

            <div className='w-[50%] flex justify-center items-center  '>
                <div>
                    <h2 className='font-semibold text-4xl text-brand-primary mb-12'  >
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


                        <button
                            type="submit"
                            className="bg-brand-secondary text-white py-3 rounded-full font-bold mt-8 w-full"
                        >
                        Log In   
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AdminLogin