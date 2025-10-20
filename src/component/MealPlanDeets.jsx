import Accordian from '../Utility/Accordian'

const MealPlanDeets = () => {
  return (
    <div 
      className="w-full min-h-[90vh] my-8 ml:mt-0 
      flex flex-col ml:flex-row items-center 
      justify-between gap-10 lg:gap-18 "
    
    >
      
      {/* Left Side */} 
      <div className=" ml:max-w-md flex-1 flex items-center justify-start px-7 xsm:px-15  ">
        <div className=" ml:max-w-md md:text-left px-0 xsm:px-0">
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-brand-cardhead mb-4">
            Try Our 10-Days <span className='text-brand-midtext'>Meal Plan</span> for Free
          </h2>
          <p className="font-sans text-brand-subtext font-normal text-lg sm:text-2xl  mb-6">
            Get a meal plan tailored to your lifestyle. Whether for workouts, family, or a student budget—we’ve got you.
          </p>
          <button className="bg-brand-secondary text-white px-7 sm:px-10 py-4 rounded-4xl font-medium text-base sm:text-lg">
            Try Meal Plan
          </button>
        </div>
      </div>

      {/* Right Side - Accordion */}
      <div className=" px-0 xsm:px-15 flex-1 w-full">
        <Accordian/>
      </div>
    </div>
  )
}

export default MealPlanDeets