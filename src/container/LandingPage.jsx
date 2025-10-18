import HeroPage from '../component/HeroPage'
import StepSection from '../component/StepSection'
import CarouselSection from '../component/CarouselSection'
import MealPlanSection from '../component/MealPlanSection'
import TestimonialSection from '../component/TestimonialSection'
import PricingSection from '../component/PricingSection'
import FAQSection from '../component/FAQSection'
import StoreSection from '../component/StoreSection'
// import Footer from '../component/Footer'
// import Footerbg from '../assets/Footerbg.jpg'
// import Cursor from '../assets/Cursor.svg'


const LandingPage = ({isScrolled, setIsScrolled }) => {
  return (
    <div>
        <HeroPage isScrolled={isScrolled} setIsScrolled={setIsScrolled} />
        <StepSection />
        <CarouselSection />
        <MealPlanSection/>
        <TestimonialSection/>
        <div className='bg-brand-carhead'>
          <PricingSection  />
        </div>
        <FAQSection  />
        <div className='bg-brand-carhead'>
          <StoreSection/>
        </div>
        {/* <Footer Footerbg={Footerbg} LeftCard='#76B1FF' Cursor={Cursor} Tooltip='#F9A720' /> */}

    </div>
  )
}

export default LandingPage