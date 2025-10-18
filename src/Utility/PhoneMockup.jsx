import Tilt from "react-parallax-tilt";
import Phone from "../assets/PhoneMockup.png";

const PhoneMockup = ({isScrolled}) => {
  return (
    <div className = {`flex justify-center items-center max-h-screen `}>
        <div 
            className={` z-10 absolute transition-all duration-700 ease-in-out pb-20 
            ${ isScrolled ? "bottom-0 rotate-0" : " bottom-[-40px] xsm:bottom-[-100px] sm:bottom-[-150px] rotate-[-12deg]"}`} 
        >
            <Tilt
                glareEnable={true}
                glareMaxOpacity={0.3}
                scale={1.05}
                transitionSpeed={2500}
                tiltMaxAngleX={20}
                tiltMaxAngleY={20}
                className="      
                    mx-auto 
                    w-[550px]      
                    sm:w-[650px]  
                "
            >
                <img
                    src={Phone}
                    alt="Phone Mockup"
                    className="w-full "
                />
            </Tilt>

        </div>
        <h1 className={`text-[400px]/80 font-black md:text-[400px] text-brand-carhead/30 absolute text-center z-0 transition-all duration-700 ease-in-out ${ isScrolled ? "top-1/5 " : "top-1/3 "}`}>
            Planned<br />Rations
        </h1>
      
    </div>
  )
}

export default PhoneMockup