import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination,Autoplay,EffectFade } from "swiper/modules";
import Testimonial1 from '../assets/Testimonial1.jpg';
import Tab1 from '../assets/Tab1.jpg';
import Tab2 from '../assets/Tab2.jpg';
import You from '../assets/You.png'
import Badge from '../assets/Badge.svg'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";




const testimonials = [
  {
    text: "PlannedRations transformed my shopping and eating habits. I waste less food and save nearly $60 monthly. It's like having a nutritionist in my pocket. Meal planning has never been easier. I save time and money every week!",
    name: "Sarah K.",
    proffesion: "32, Busy Professional",
    img:Testimonial1
  },
  {
    text: "PlannedRations transformed my shopping and eating habits. I waste less food and save nearly $60 monthly. It's like having a nutritionist in my pocket. Meal planning has never been easier. I save time and money every week!",
    name: "Sarah K.",
    proffesion: "32, Busy Professional",
    img: Testimonial1,
  },
  {
    text: "PlannedRations transformed my shopping and eating habits. I waste less food and save nearly $60 monthly. It's like having a nutritionist in my pocket. Meal planning has never been easier. I save time and money every week!",
    name: "Sarah K.",
    proffesion: "32, Busy Professional",
    img: You,
  },
    {
    text: "PlannedRations transformed my shopping and eating habits. I waste less food and save nearly $60 monthly. It's like having a nutritionist in my pocket. Meal planning has never been easier. I save time and money every week!",
    name: "Sarah K.",
    proffesion: "32, Busy Professional",
    img: Tab2,
  },
];


const TestimonialSection = () => {

   
    const [bgImage, setBgImage] = useState(testimonials[0].img);

    const [isWide, setIsWide] = useState(window.innerWidth > 845);

    useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth > 845);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);


  return (
    <div
      className="relative w-full py-16 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

        {/* Full Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-lg bg-black/40 transition-all duration-700"></div>


        <div className="relative z-10  mx-auto xsm:px-15">
            {/* Top Row */}
            <div className="flex flex-col ml:flex-row justify-center  ml:justify-between items-center mb-10 px-7 xsm:px-0 ">
                <div className="text-center ml:text-left">
                    <h2 className="font-heading font-bold text-3xl sm:text-5xl text-brand-carhead">What People Are Saying</h2>
                    <p className="font-normal text-lg sm:text-2xl font-sans text-brand-offwhite my-7">See why thousands of people trust PlannedRations <br /> for their daily meals.</p>
                </div>
                <div className="flex items-center gap-3">
                    <img src={Badge} alt="Badge" className=" w-14 h-14 sm:w-20 sm:h-20 object-contain" />
                    <span className="text-brand-planoff font-medium leading-tight text-lg">
                        Trusted by <br />
                        <b className="font-bold text-brand-carhead">1000+ customers</b>
                    </span>
                </div>

            </div>

            {/* Carousel */}
            <Swiper
                modules={[Navigation, Pagination,Autoplay,EffectFade]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                autoplay={{
                    delay: 0, // 3 seconds
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={true}
                pagination={{ el: ".custom-pagination", clickable: true }}
                onSlideChange={(swiper) => setBgImage(testimonials[swiper.realIndex].img)}
                className="pb-12 "
               speed={4000}
            >
                {
                    isWide ? 
                    testimonials.map((t, i) => (
                        <SwiperSlide key={i}>
                            <div className="flex flex-col md:flex-row items-stretch bg-brand-carhead rounded-4xl py-10 px-14">
                                {/* Text */}
                                <div className="flex-2 pr-10 flex">
                                    <div className="flex flex-col justify-between h-full" >
                                        <p className="text-4xl/12 font-sans font-bold text-brand-head">“{t.text}”</p>
                                        <h4 className="font-bold text-2xl"> 
                                            <span className="text-brand-subtext">{t.name} -</span> 
                                            <span className="text-brand-cartext">{t.proffesion}</span> 
                                        </h4>
                                    </div>
                                </div>
                                {/* Image */}
                                <div className="flex-1 flex w-full h-140">
                                    <img
                                        src={t.img}
                                        alt={t.name}
                                        className="w-full  rounded-3xl object-cover"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    )) :
                    testimonials.map((t, i) => (
                        <SwiperSlide key={i}>
                            <div className=" bg-brand-carhead rounded-4xl px-5 py-5 xsm:py-10 xsm:px-10 sm:px-14">
                                {/* Text */}

                                <div className="flex flex-col justify-between h-full mb-7" >
                                    <p className=" text-xl xsm:text-3xl/12 font-sans font-bold text-brand-head">
                                        “{t.text}”
                                    </p>
                                </div>

                                {/* Image */}
                                <div className="flex items-end w-full gap-4 xsm:gap-7 ">
                                    <img
                                        src={t.img}
                                        alt={t.name}
                                        className=" w-40 h-40 xsm:w-80 xsm:h-80 rounded-xl xsm:rounded-3xl object-cover"
                                    />

                                    <h4 className="font-bold text:lg xsm:text-2xl"> 
                                        <span className="text-brand-subtext">{t.name} -</span> 
                                        <span className="text-brand-cartext">{t.proffesion}</span> 
                                    </h4>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))                   

                            
                }
            </Swiper>

            {/* Controls */}
            <div className="flex items-center justify-start gap-4 mx-auto w-[400px] p-2 mt-8 ">
                {/* Prev Button */}
                <button className="custom-prev w-30 h-16 rounded-full text-4xl font-bold bg-brand-carhead/40 text-brand-carhead hover:bg-brand-carhead hover:text-brand-cardhead flex items-center justify-center">
                    ←
                </button>

                {/* Pagination in the middle */}
                <div className="custom-pagination flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-brand-carhead/40 w-4"></div>

                {/* Next Button */}
                <button className="custom-next w-30 h-16 text-4xl font-bold rounded-full bg-brand-carhead/40 text-brand-carhead hover:bg-brand-carhead hover:text-brand-cardhead flex items-center justify-center">
                    →
                </button>

            </div>

        </div>

    </div>
  )
}

export default TestimonialSection