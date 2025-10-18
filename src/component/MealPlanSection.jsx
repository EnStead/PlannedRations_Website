import Doodle from '../assets/Doddle.svg'
import Doodle2 from '../assets/Doddle2.svg'
import You from '../assets/You.png'
import PlanCarousel from '../Utility/PlanCarousel'
import MealPlanDeets from './MealPlanDeets'

const MealPlanSection = () => {
  return (
    <div id='plans' className='pt-37 pb-5 relative bg-brand-carhead'>

        <div className='bg-brand-carhead px-7 xsm:px-15 mb-7 pb-16  ' >
            <div
                className={
                    `absolute top-0 left-0 w-full 
                    bg-gradient-to-b from-brand-primary
                    via-brand-primary/50 to-transparent z-20 h-30`
                }
            >                
            </div>

            <div className='text-center'>
        
                <div className='pb-10'>
                    <h2 className="font-heading font-bold text-3xl sm:text-5xl text-brand-head pb-2 " >
                        Your Meals, Planned Your Way.
                    </h2>
                    <p className="font-sans text-brand-subtext font-normal text-lg sm:text-2xl  my-7 ">
                        From budget-friendly groceries to clear plans, PlannedRations <br /> makes eating well effortless.
                    </p>
        
                </div> 
        
                <div className="flex flex-col ml:flex-row justify-center text-center gap-16 ml:gap-6 lg:gap-10 xl:gap-16 ">
                    {/* Card1 */}
                    <div className=" ml:flex-1 bg-brand-orange shadow rounded-xl overflow-hidden flex flex-col h-[500px] ssm:h-[600px] text-center justify-end"
                        style={{ backgroundImage: `url(${Doodle})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                    
                        <div className=" px-5 ssm:px-10 ml:px-3 lg:px-5 xl:px-10 py-5 text-center">
                            <h3 className="text-xl sm:text-3xl text-brand-carhead font-heading font-semibold">Your Goals, Your Pantry</h3>
                            <p className=" text:lg sm:text-2xl text-brand-planoff font-sans">
                                Set monthly budgets, and we’ll scan what’s in your pantry to make it work.
                            </p>
                        </div>
                    </div>
        
                    {/* Card2 */}
                    <div className=" ml:flex-1 bg-transparent rounded-xl overflow-hidden flex flex-col h-[500px] ssm:h-[600px] text-center justify-start relative"
                        style={{
                            backgroundImage: `url(${You})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div
                            className={`absolute top-0 left-0 w-full bg-gradient-to-b from-brand-primary via-brand-primary/10 to-transparent  h-30
                            }`}
                        ></div>
                    
                        <div className=" px-4 ssm:px-17 ml:px-3 lg:px-5 xl:px-17 py-5 text-center z-20">
                            <h3 className="text-3xl text-brand-carhead font-heading font-semibold">Planned just for <br /> YOU!</h3>
                            
                        </div>
                    </div>
        
                    {/* Card3 */}
                    <div className=" ml:flex-1 bg-brand-purple shadow rounded-xl overflow-hidden flex flex-col h-[500px] ssm:h-[600px] text-center justify-end"
                        style={{ backgroundImage: `url(${Doodle2})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                    
                        <div className=" px-5 ssm:px-10 ml:px-3 lg:px-5 xl:px-10 py-5 text-center">
                            <h3 className="text-xl sm:text-3xl text-brand-carhead font-heading font-semibold">Meals That Fit You</h3>
                            <p className="text:lg sm:text-2xl text-brand-planoff font-sans">
                                Get ready-to-cook recipes, grocery lists, and nutrition insights for your lifestyle.
                            </p>
                        </div>
                    </div>
                </div>
        
            </div>            

        </div>

        {/* Plan Carousel */}
        <div className='mt-10'>
            <PlanCarousel/>
        </div>

        {/* Meal Plan Deets */}
        <MealPlanDeets/>
        
    </div>
  )
}

export default MealPlanSection