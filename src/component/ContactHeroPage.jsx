import Chat from '../assets/Chat.svg'
import Support from '../assets/Support.svg'
import Location from '../assets/Location.svg'
import Follow from '../assets/Follow.svg'
import { Link } from 'react-router-dom'


const ContactHeroPage = () => {
  return (
    <div className='bg-brand-background1 px-7 xsm:px-15 py-30'>
        <div className='py-10 text-center ' > 
            <h2 className='font-heading font-bold text-brand-head text-3xl sm:text-5xl pb-3' >
                Get In touch with Us
            </h2>
            <p className='font-normal text-brand-subtexttext-lg sm:text-2xl ' >
                Tell us how we can assist you.
            </p>
        </div>
        <section className="py-20 w-full grid md:grid-cols-2 gap-10 ml:gap-20">
            {/* Box 1 */} 
            <div className="bg-white rounded-2xl p-5 xsm:p-10 md:p-5 ml:p-10">
                <div className=' mb-7 xsm:mb-14'>
                    <img src={Chat} alt="Chat"  className=' p-1 xsm:py-3 xsm:px-3 rounded-lg xsm:rounded-xl bg-brand-planbut ' />
                </div>
                <h3 className=" text-lg xsm:text-2xl font-semibold text-brand-head font-heading">Chat With Support</h3>
                <p className='text-brand-cartext mb-3'  >
                    Speak to our friendly team
                </p>
                <p className="text-brand-midtext underline italic xsm:text-lg lg:text-xl">
                    support@plannedration.com
                </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-2xl p-5 xsm:p-10 md:p-5 ml:p-10">
                <div className='mb-7 xsm:mb-14'>
                    <img src={Location} alt="Chat"  className='p-1 xsm:py-3 xsm:px-3 rounded-lg xsm:rounded-xl bg-brand-planbut ' />
                </div>
                <h3 className=" text-lg xsm:text-2xl font-semibold text-brand-head font-heading">Visit us</h3>
                <p className='text-brand-cartext mb-3'  >
                    Come say “Hi” at our office
                </p>
                <p className="text-brand-head xsm:text-lg lg:text-xl">
                    390 NE, 191st St, Miami, Florida
                </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-2xl p-5 xsm:p-10 md:p-5 ml:p-10">
                <div className='mb-7 xsm:mb-14'>
                    <img src={Support} alt="Chat"  className='pp-1 xsm:py-3 xsm:px-3 rounded-lg xsm:rounded-xl bg-brand-planbut ' />
                </div>
                <h3 className=" text-lg xsm:text-2xl font-semibold text-brand-head font-heading">Contact Sales</h3>
                <p className='text-brand-cartext mb-3'  >
                    Speak to our sales experts
                </p>
                <p className="text-brand-midtext underline italic xsm:text-lg lg:text-xl">
                    sales@plannedration.com
                </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white rounded-2xl p-5 xsm:p-10 md:p-5 ml:p-10">
                <div className='mb-7 xsm:mb-14'>
                    <img src={Follow} alt="Chat"  className='p-1 xsm:py-3 xsm:px-3 rounded-lg xsm:rounded-xl bg-brand-planbut ' />
                </div>
                <h3 className=" text-lg xsm:text-2xl font-semibold text-brand-head font-heading">Follow Us</h3>
                <p className='text-brand-cartext mb-3'  >
                    Come say “Hi” at our office
                </p>
                <div className="text-brand-head xsm:text-lg lg:text-xl grid grid-cols-2 xsm:grid-cols-4 md:grid-cols-2 ls:flex flex-col ls:flex-row gap-3 ">
                    <Link className='underline w-fit' to='/contact' >Twitter</Link>
                    <Link className='underline w-fit' to='https://www.instagram.com/plannedrations' >Instagram</Link>
                    <Link className='underline w-fit' to='/contact'>Facebook</Link>
                    <Link className='underline w-fit' to='/contact' > Youtube</Link>
                </div>
            </div>

        </section>

    </div>
  )
}

export default ContactHeroPage