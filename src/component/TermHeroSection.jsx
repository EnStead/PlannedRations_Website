import Doodle from '../assets/Doddle3.svg'

const TermHeroSection = () => {
  return (
    <section
      className="relative h-[40vh] sm:h-[70vh] w-full  overflow-hidden bg-brand-charcoal "        
      style={{ backgroundImage: `url(${Doodle})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
      <div className=" text-white flex flex-col justify-end items-start p-7 xsm:p-15 h-full ">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl text-brand-carhead pb-4">Terms of Service</h1>
          <p className=" text-base sm:text-xl font-medium">Last Updated: September 29, 2025</p>
      </div>
    </section>
  )
}

export default TermHeroSection