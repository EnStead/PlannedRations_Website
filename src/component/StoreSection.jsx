import AppStore from '../assets/AppStore.png'
import PlayStore from '../assets/Playstore.png'
import Blackbg from '../assets/Blackbg.png'
import DoublePhone from '../assets/DoublePhone.png'


const StoreSection = () => {
  return (
    <section className="py-27 px-7 xsm:px-15 min-h-[120vh] bg-brand-offwhite relative flex items-center rounded-t-[100px] ">
        <div className='relative w-full mt-20 ' >
            <div className='bg-brand-secondary relative flex flex-col justify-between w-full rounded-4xl lg:h-[80vh]  ' 
                style={{ backgroundImage: `url(${Blackbg})`, backgroundSize: "cover", backgroundPosition: "bottom" }} 
            >
                {/* Title & Subtitle */}
                <div className='p-6 xsm:p-12 lg:max-w-[440px] xl:max-w-[700px] lss:max-w-[500px]'>
                    <h2 className="font-heading font-bold text-3xl sm:text-5xl text-brand-carhead mb-4 ">
                        Ready to Take Control of Your Meals?
                    </h2>
                    <p className="font-sans text-brand-planoff font-normal text-lg sm:text-2xl mb-12">
                        Join thousands already planning smarter and eating better with PlannedRations. Your free trial starts today.
                    </p>
                    <div className=" relative  flex  gap-4 mt-3 mb-4 ">
                        <img src={PlayStore} alt="Google Play" className=" h-9 xsm:h-14  lg:w-fit lg:m-auto" />
                        <img src={AppStore} alt="App Store" className=" h-9 xsm:h-14  lg:w-fit lg:m-auto" />
                    </div>
                    <div className=' flex lg:hidden '>
                        <img
                            src={DoublePhone}
                            alt="Blackbg"
                            className=" max-w-70  xsm:max-w-xs sm:max-w-md md:max-w-lg lss:max-w-xl mr-auto"
                        />
                    </div>
                </div>
            </div>
            <div className=' hidden lg:flex absolute bottom-0 -right-8'>
                <img
                    src={DoublePhone}
                    alt="Blackbg"
                    className="max-w-lg lss:max-w-xl "
                />
            </div>
        </div>
    </section>
  )
}

export default StoreSection