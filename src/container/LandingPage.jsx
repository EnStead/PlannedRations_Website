import HeroPage from '../component/HeroPage'
import StepSection from '../component/StepSection'
import CarouselSection from '../component/CarouselSection'
import MealPlanSection from '../component/MealPlanSection'
import TestimonialSection from '../component/TestimonialSection'
import PricingSection from '../component/PricingSection'
import FAQSection from '../component/FAQSection'
import StoreSection from '../component/StoreSection'
import HeroPageMisc from '../Utility/HeroPageMisc'



const LandingPage = ({isScrolled, setIsScrolled }) => {
  return (
    <div>
        <HeroPageMisc/>
        
        {/* HIDEN SECTION*/}


        {/* <HeroPage isScrolled={isScrolled} setIsScrolled={setIsScrolled} />
        <StepSection />
        <CarouselSection /> */}
        <MealPlanSection/>
        {/* <TestimonialSection/>
        <div className='bg-brand-carhead'>
          <PricingSection  />
        </div> */}
        {/* <FAQSection  />
        <div className='bg-brand-carhead'>
          <StoreSection/>
        </div> */}

    </div>
  )
}

export default LandingPage