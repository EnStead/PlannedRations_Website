import { useEffect, useState } from "react";
// import Navbar from './Navbar'
import AppStore from '../assets/AppStore.png'
import PlayStore from '../assets/Playstore.png'
import PhoneMockup from "../Utility/PhoneMockup";

const HeroPage = ({isScrolled}) => {

  return (
    <div className='bg-brand-accent min-h-screen'>            
        {/* Hero content */}
        <div className="flex flex-col items-center justify-start h-screen text-center px-4 relative overflow-hidden min-h-[120vh]">
            {/* Text + Buttons (only before scroll) */}
            
            <div
                className={`transition-opacity duration-700 mt-20 ${
                    isScrolled ? "opacity-0 hidden" : "opacity-100"
                }`}
            >
                <h2 className="text-4xl sm:text-5xl  mb-4 font-black text-brand-head font-heading ">
                    Eat Smarter. Save Time. <br /> Cut Food Waste.
                </h2>
                <p className="text-lg mb-6 text-brand-subtext font-light font-sans ">
                    Personalized meal planning that fits your pantry, goals, and budget.
                </p>
                <div className="flex gap-7 ssm:gap-10 justify-center">
                    <img src={PlayStore} alt="Google Play" className=" h-9 ssm:h-13" />
                    <img src={AppStore} alt="App Store" className=" h-9 ssm:h-13" />
                </div>
            </div>

            <div className=" py-0 ssm:py-20 ">
                <PhoneMockup isScrolled={isScrolled}  />                    
            </div>
            <div
                className={`absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-brand-accent via-brand-accent/90 to-transparent z-20 ${
                    isScrolled ? "h-60" : "h-40"
                }`}
            ></div>



        </div>
    </div>
  )
}

export default HeroPage