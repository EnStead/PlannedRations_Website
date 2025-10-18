import Placeholder from '../assets/Placeholder.jpg'

const StepSection = () => {
  return (
    <div id='how-it-works' 
        className='bg-brand-background1 min-h-[100vh] 
        flex flex-col justify-center text-center 
        px-7 xsm:px-15 py-30'
    >

        <div className='pb-10'>
            <h2 className="font-heading font-bold text-center text-3xl sm:text-5xl text-brand-head pb-2 " >
                Three Steps to Smarter Eating
            </h2>
            <p className="font-sans text-brand-subtext font-normal text-lg sm:text-2xl ">
                PlannedRations simplifies meal scanning, week planning, and grocery syncing.
            </p>

        </div>

        <div className="flex flex-col gap-16 lg:flex-row xl:gap-16 lg:gap-12 ">
            {/* Card1 */}
            <div className="  lg:flex-1 bg-white shadow rounded-xl overflow-hidden flex flex-col h-[500px]">
                {/* Image */}
                <div className="flex-[3] lg:flex-[3] min-h-0">
                    <img
                        src={Placeholder}
                        alt="Step 1"
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Text */}
                <div className="flex-[1] lg:flex-[1] p-4 text-center">
                    <h3 className="text-xl text-brand-cardhead font-heading font-semibold">Scan or Log Meals</h3>
                    <p className="text-sm text-brand-muted font-sans">
                        Snap your meal or scan groceries to analyze instantly.
                    </p>
                </div>
            </div>

            {/* Card2 */}
            <div className=" lg:flex-1 bg-white shadow rounded-xl overflow-hidden flex flex-col h-[500px]">
                <div className="flex-[3] lg:flex-[3] min-h-0">
                    <img
                        src={Placeholder}
                        alt="Step 2"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-[1] lg:flex-[1] p-4 text-center">
                    <h3 className="text-xl text-brand-cardhead font-heading font-semibold">Smart Meal Plans</h3>
                    <p className="text-sm text-brand-muted font-sans">
                        AI builds your weekly meal plan from pantry + goals.
                    </p>
                </div>
            </div>

            {/* Card3 */}
            <div className=" lg:flex-1 bg-white shadow rounded-xl overflow-hidden flex flex-col h-[500px]">
                <div className="flex-[3] lg:flex-[3] min-h-0">
                    <img
                        src={Placeholder}
                        alt="Step 3"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-[1] lg:flex-[1] p-4 text-center">
                    <h3 className="text-xl text-brand-cardhead font-heading font-semibold">Auto Grocery Sync</h3>
                    <p className="text-sm text-brand-muted">
                        Your grocery list updates automatically, cutting waste.
                    </p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default StepSection