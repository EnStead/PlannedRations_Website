import { useEffect, useState } from 'react';
import Accordian from '../Utility/Accordian'
import ModalImage from '../assets/ModalPhone.png'
import CustomSelect from '../Utility/CustomSelect';
import axios from "axios";


const MealPlanDeets = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    how_you_heard: "",
    goal_type: ""
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // prevent scroll
    } else {
      document.body.style.overflow = "auto";   // restore scroll
    }
    // Cleanup if component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);



    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.plannedrations.com/api/web/newsletter/subscribe",
        form 
      );

      // Assuming success if status is 200
      if (res.status === 200) {
        setAlert({ type: "success", message: "✅ You’ve successfully subscribed!" });
        // Reset form
        setForm({     
          name: "",
          email: "",
          how_you_heard: "",
          goal_type: "" 
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setAlert({
        type: "error",
        message:
          error.response?.data?.message ||
          "❌ Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }

  };

  return (
    <div 
      className="w-full min-h-[90vh] my-8 ml:mt-0 
      flex flex-col ml:flex-row items-center 
      justify-between gap-10 lg:gap-18 "

    >
      
      {/* Left Side */} 
      <div className=" ml:max-w-md flex-1 flex items-center justify-start px-7 xsm:px-15  ">
        <div className=" ml:max-w-md md:text-left px-0 xsm:px-0">
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-brand-cardhead mb-4">
            Try Our 10-Days <span className='text-brand-midtext'>Meal Plan</span> for Free
          </h2>
          <p className="font-sans text-brand-subtext font-normal text-lg sm:text-2xl  mb-6">
            Get a meal plan tailored to your lifestyle. Whether for workouts, family, or a student budget—we’ve got you.
          </p>
          <button  onClick={() => setIsOpen(true)} className="bg-brand-secondary text-white px-7 sm:px-10 py-4 rounded-4xl font-medium text-base sm:text-lg cursor-pointer ">
            Try Meal Plan
          </button>
          
          {alert.message && (
              <p
              className={`mt-3 text-sm font-medium ${
                  alert.type === "success" ? "text-green-600" : "text-red-600"
              }`}
              >
              {alert.message}
              </p>
          )}
        </div>
      </div>

      {/* Right Side - Accordion */}
      <div className=" px-0 xsm:px-15 flex-1 w-full">
        <Accordian/>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-11/12 max-w-5xl mx-auto overflow-hidden flex flex-col md:flex-row">
            
            {/* Left - Form */}
            <div className="flex-1 p-6 md:p-10">
              <h2 className="text-3xl font-semibold mb-3 text-brand-gray font-heading">Get notified when we launch</h2>
              <p className='text-brand-footnoti1 mb-6 ' >
                Stay up to date with the latest news, announcements, and articles.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1 font-medium text-brand-cartext">Name (optional)</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-brand-planoff rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-1 font-medium text-brand-cartext">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="border border-brand-planoff rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
                  />
                </div>

                {/* Selects side by side */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <CustomSelect
                    label="How did you hear about us?"
                    options={["Instagram", "TikTok", "Facebook","Twitter / X", "Online Campaigns", "Friend or family", "Blogs", "Google search", "Other"]}
                    value={form.how_you_heard}
                    onChange={(val) => setForm({ ...form, how_you_heard: val })}
                  />

                  <CustomSelect
                    label="What's your fitness goal?"
                    options={["Eat healthier", "Lose weight", "Gain muscle", "Improve energy", "Maintain a balanced lifestyle"]}
                    value={form.goal_type}
                    onChange={(val) => setForm({ ...form, goal_type: val })}
                  />


                </div>

                <button
                  type="submit"
                  className="bg-brand-secondary text-white py-3 rounded-full font-bold mt-8 w-70"
                >
                  {loading ? "Subscribing..." : "Submit & Download PDF"} 
                </button>
              </form>

            </div>

            {/* Right - Image */}
            <div className="relative flex-1 hidden lg:flex items-center justify-center bg-brand-purp w-full h-full pt-20 ">
              <img src={ModalImage} alt="Meal Plan" className="object-bottom w-[60%] h-full " />
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-10 text-black rounded-full py-1 px-3 bg-white z-10  text-3xl font-semibold"
            >
              ×
            </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default MealPlanDeets