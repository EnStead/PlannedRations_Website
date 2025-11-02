import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay } from "swiper/modules";
import Pescatarian from '../assets/Pescatarian.svg'
import DairyFree from '../assets/Dairy-Free.svg'
import Vegan from '../assets/Vegan.svg'
import Keto from '../assets/Keto.svg'
import LowCarb from '../assets/Low-Carb.svg'
import GlutenFree from '../assets/Gluten-Free.svg'
import Vegetarian from '../assets/Vegetarian.svg'
import Paleo from '../assets/Paleo.svg'
import HighProtein from '../assets/High-Protein.svg'
import Mediterranean from '../assets/Mediterranean.svg'
import "swiper/css";



const dietTypes = [
  { src: Vegetarian, alt: "Vegetarian", title: "Vegetarian" },
  { src: Pescatarian, alt: "Pescatarian", title: "Pescatarian" },
  { src: Vegan, alt: "Vegan", title: "Vegan" },
  { src: DairyFree, alt: "DairyFree", title: "Dairy-Free" },
  { src: Keto, alt: "Keto", title: "Keto" },
  { src: LowCarb, alt: "LowCarb", title: "Low-Carb" },
  { src: GlutenFree, alt: "Gluten-Free", title: "GlutenFree" },
  { src: Paleo, alt: "Paleo", title: "Paleo" },
  { src: HighProtein, alt: "High-Protein", title: "High-Protein" },
  { src: Mediterranean, alt: "Mediterranean", title: "Mediterranean" },
  { src: Vegetarian, alt: "Vegetarian", title: "Vegetarian" },
  { src: Pescatarian, alt: "Pescatarian", title: "Pescatarian" },
  { src: Vegan, alt: "Vegan", title: "Vegan" },
  { src: DairyFree, alt: "DairyFree", title: "Dairy-Free" },
  { src: Keto, alt: "Keto", title: "Keto" },
  { src: LowCarb, alt: "LowCarb", title: "Low-Carb" },
  { src: GlutenFree, alt: "Gluten-Free", title: "GlutenFree" },
  { src: Paleo, alt: "Paleo", title: "Paleo" },
  { src: HighProtein, alt: "High-Protein", title: "High-Protein" },
  { src: Mediterranean, alt: "Mediterranean", title: "Mediterranean" },
  // add more as needed
];


const PlanCarousel = () => {
  return (
    <div className="w-full mx-auto bg-brand-darkpurple py-1 ">
        {/* Carousel Section */}
        <Swiper
            modules={[Autoplay]}
              slidesPerView="auto"   // allow natural width
                spaceBetween={80}
                loop={true}
                speed={10000}          // make it very slow & smooth
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                allowTouchMove={false} // optional, so users don’t drag
        >

            {dietTypes.concat(dietTypes).map((diet, index) => (
                <SwiperSlide key={index} className="!w-auto">
                    <div className="flex items-center gap-2 w-fit">
                        {/* Image */}
                        <div>
                            <img
                                src={diet.src}
                                alt={diet.alt}
                                className="w-8 h-full object-cover"
                            />
                        </div>

                        {/* Text */}
                        <div>
                        <h3 className="text-xl text-brand-carhead font-heading font-bold uppercase">
                            {diet.title}
                        </h3>
                        </div>
                    </div>
                </SwiperSlide>
            ))}

            
        </Swiper>
    </div>
  )
}

export default PlanCarousel