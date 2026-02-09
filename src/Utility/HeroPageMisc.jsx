import { useNavigate } from "react-router-dom";
import PhoneMockupMisc from "./PhoneMockupMisc"


const HeroPageMisc = () => {
      const navigate = useNavigate();

  return (
    <div className='bg-brand-accent min-h-screen'>            
        {/* Hero content */}
        <div className="flex flex-col items-center justify-start h-screen text-center px-4 relative overflow-hidden max-h-[100vh]">
           
            <div
                className={`transition-opacity duration-700 mt-10 ssm:mt-20 opacity-100 z-20`}
            >
                <h2 className="text-4xl sm:text-5xl  mb-4 font-black text-brand-head font-heading ">
                    Eat Smarter. Save Time. <br /> Cut Food Waste.
                </h2>
                <p className="text-lg mb-6 text-brand-subtext font-light font-sans ">
                    Personalized meal planning that fits your pantry, goals, and budget.
                </p>
                <div className="flex flex-col w-50 mx-auto  ssm:w-fit ssm:flex-row gap-7 ssm:gap-10 justify-center">
                    <div  className="bg-[#333333] text-white px-10 py-4 rounded-4xl font-semibold text-sm">
                        Coming Soon
                    </div>
                    <button onClick={() => navigate("/blog")} className=" border-2 bg-brand-accent  border-brand-head text-brand-head px-10 py-4 rounded-4xl font-semibold text-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
                        Visit Our Blog
                    </button>
                </div>
            </div>

            <div className=" py-0 ssm:py-20 ">
                <PhoneMockupMisc />                    
            </div>
            <div
                className={`absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-brand-accent via-brand-accent/90 to-transparent z-20`}
            ></div>



        </div>
    </div>
  )
}

export default HeroPageMisc