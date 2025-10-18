import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination,Autoplay,EffectFade } from "swiper/modules";
import Fitness from '../assets/Tab1.jpg';
import Family from '../assets/Tab2.jpg';
import Freelancers from '../assets/Tab3.jpg';
import Students from '../assets/Tab4.jpg';


const tabs = [
  {
    title: "Fitness Person",
    img: Fitness,
    text: "Fuel your gains with high-protein plans.",
  },
  {
    title: "Family Chefs",
    img: Family,
    text: "Easy meals everyone will enjoy.",
  },
  {
    title: "Freelancers",
    img: Freelancers,
    text: "Reduce waste and save money.",
  },
  {
    title: "Students",
    img: Students,
    text: "Fast, budget-friendly recipes",
  },
];


const Accordian = () => {

    const [isWide, setIsWide] = useState(window.innerWidth > 640);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth > 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);


  return (

    <div className="flex sm:h-[600px] w-full overflow-hidden rounded-xl gap-2">

      {
        isWide ?
        
        tabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => setActiveTab(i)}
            className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-700 ease-in-out ${
              activeTab === i ? "flex-[4]" : "xls:flex-[0.3] lg:flex-[0.5] ml:flex-[0.8] flex-[0.48]  "
            }`}
          >
              {/* Background Image */}
              <img
                  src={tab.img}
                  alt={tab.title}
                  className={`absolute inset-0 rounded-xl  h-full w-full object-cover transition-all duration-700 ${
                      activeTab === i ? "scale-100 blur-0" : "scale-105 blur-sm"
                  }`}
              />
  
              {/* Dark Overlay with Title (when closed) */}
              <div
                  className={`absolute inset-0 rounded-lg bg-black/70 transition-all duration-700 ${
                      activeTab === i ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
                  }`}
                  >
                  <span
                      className="absolute left-0 bottom-4 whitespace-nowrap text-brand-carhead font-heading font-bold text-3xl [writing-mode:vertical-rl] [text-orientation:mixed]"
                  >
                      {tab.title}
                  </span>
              </div>
  
  
              {/* Expanded Text (inside image) */}
              {activeTab === i && (
                  <div className="absolute rounded-b-xl bottom-0 left-0 right-0 text-brand-carhead bg-black/40 transition-opacity duration-700 delay-300">
                      <h3 className="text-2xl font-heading font-semibold py-4 px-2">{tab.text}</h3>
                  </div>
              )}
              </div>
        ))  :

        <Swiper
          modules={[Autoplay,EffectFade]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
              delay: 0, // 3 seconds
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
          }}
          loop={true}         
          className="pb-12"
          speed={4000}
        >
          {tabs.map((tab, i) => (
            <SwiperSlide key={i}>
                <div
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-700 ease-in-out`}
                >
                    {/* Background Image */}
                    <img
                      src={tab.img}
                      alt={tab.title}
                      className={` rounded-xl  h-80 w-full object-cover transition-all duration-700`}
                    />

                    {/* Expanded Text (inside image) */}
                    <div 
                      className="absolute rounded-b-xl bottom-0 left-0 
                      right-0 text-brand-carhead bg-black/40 
                      transition-opacity duration-700 delay-300"
                    >
                      <h3 className=" text-lg sm:text-2xl font-heading font-semibold py-4 px-2">
                        {tab.text}
                      </h3>
                    </div>

                </div>

            </SwiperSlide>
          ))}
        </Swiper>


      }
     
      
    </div>
  )
}

export default Accordian