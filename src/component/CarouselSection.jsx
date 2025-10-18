import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Autoplay } from "swiper/modules";
import Placeholder from '../assets/Placeholder.jpg'
import "swiper/css";
import "swiper/css/navigation";

const CarouselSection = () => {

  const data=[
    {
      image: Placeholder,
      title: 'Smart Meal Plans',
      text: 'Get personalized plans tailored to your goals, pantry items, and dietary needs—with daily or weekly views.'
    },
    {
      image: Placeholder,
      title: 'Budget Tracking',
      text: 'Track your monthly food spending, set limits, and get smart alerts to keep your wallet happy.'
    },
    {
      image: Placeholder,
      title: 'Waste Warrior',
      text: 'Cut food waste with pantry reminders, recipe suggestions for soon-to-expire items, and weekly eco-scores.'
    },
    {
      image: Placeholder,
      title: 'Cooking Mode',
      text: 'Turn recipes into guided step-by-step instructions, complete with timers, icons, and gamified progress.'
    },
    {
      image: Placeholder,
      title: 'Nutrition Scan',
      text: 'Instantly scan barcodes or meals to see calories, macros, and nutrition details in seconds.'
    },
    {
      image: Placeholder,
      title: 'Achievements & Streaks',
      text: 'Stay motivated with badges, streaks, and challenges that reward consistency and progress.'
    },
    {
      image: Placeholder,
      title: 'Recipe Discovery',
      text: 'Search or let AI suggest new recipes based on what’s in your pantry, your goals, or your cravings.'
    },
  ]

  return (
    <div id='features' className="w-full mx-auto min-h-[100vh] py-27 bg-brand-head ">
      {/* Header Row */}
      <div className="flex ml:flex-row flex-col items-center justify-between mb-16 px-7 xsm:px-15">
        {/* Left: Title + Subtext */}
        <div className="text-center ml:text-left mb-7 ml:mb-0" >
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-brand-carhead mb-7">
            Everything You Need in One App
          </h2>
          <p className="text-brand-offwhite font-sans text-lg sm:text-2xl  mt-1 font-normal">
            Explore how we simplifies meal planning for you. From <br /> nutrition tracking to coordinating family friendly meals.
          </p>
        </div>

        {/* Right: Carousel Buttons */}
        <div className="flex gap-10  ml:pl-20 lg:pl-0">
          <button className="custom-prev !static !w-14 !h-14 !rounded-full !bg-transparent border-2 flex items-center justify-center text-brand-muted text-2xl shadow hover:bg-brand-carhead hover:text-white active:bg-brand-carhead active:text-white ">
            &#8592;
          </button>
          <button className="custom-next !static !w-14 !h-14 !rounded-full !bg-transparent border-2 flex items-center justify-center text-brand-muted text-2xl shadow hover:bg-brand-carhead hover:text-white active:bg-brand-carhead active:text-white">
            &#8594;
          </button>
        </div>
      </div>

      {/* Carousel */}
      <Swiper
        modules={[Navigation,Autoplay]}
        spaceBetween={60}
        slidesPerView={3}
        navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
        }}
        autoplay={{
            delay: 1000, // 3 seconds
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }}
        loop={true}
        breakpoints={{
            0: { slidesPerView: 1 }, // mobile
            768: { slidesPerView: 2 }, // tablet
            1024: { slidesPerView: 3 }, // desktop
        }}
        className="pb-6"
      >
        {
          data.map((c, i) =>(
            <SwiperSlide key={i} className=" md:px-0 " >
              <div className="flex-1 bg-transparent shadow rounded-xl overflow-hidden flex flex-col h-[500px]">
                <div className="flex-[3] min-h-0">
                    <img
                      src={c.image}
                      alt="Step 1"
                      className="w-full h-full object-cover rounded-xl"
                    />
                </div>
                {/* Text */}
                <div className="flex-[1] py-4 text-left">
                    <h3 className="text-xl text-brand-carhead font-heading font-semibold">{c.title}</h3>
                    <p className="text-sm text-brand-muted font-sans">
                      {c.text}
                    </p>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default CarouselSection