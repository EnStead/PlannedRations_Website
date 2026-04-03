import Chat from "../assets/Chat.svg";
import Support from "../assets/Support.svg";
import Location from "../assets/Location.svg";
import Follow from "../assets/Follow.svg";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const ContactHeroPage = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const iconAnim = (delayMs = 0) => ({
    animationName: isInView ? "contactIconBounce" : "none",
    animationDuration: "850ms",
    animationTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    animationIterationCount: 2,
    animationDelay: `${delayMs}ms`,
    animationFillMode: "both",
  });

  const followLinkClass =
    'relative w-fit underline underline-offset-4 decoration-[1.5px] after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100';

  return (
    <div ref={sectionRef} className="bg-brand-background1 px-7 xsm:px-15 py-30">
      <style>{`
        @keyframes contactIconBounce {
          0% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
          55% { transform: translateY(0); }
          75% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div className="py-10 text-center">
        <h2 className="font-heading font-bold text-brand-head text-3xl sm:text-5xl pb-3">
          Get In touch with Us
        </h2>
        <p className="font-normal text-brand-subtext text-lg sm:text-2xl">
          Tell us how we can assist you.
        </p>
      </div>

      <section className="py-20 w-full grid md:grid-cols-2 gap-10 ml:gap-20">
        <div className="bg-white rounded-2xl p-5 xsm:p-10 md:p-5 ml:p-10">
          <div className="mb-7 xsm:mb-14">
            <img
              src={Chat}
              alt="Chat"
              style={iconAnim(0)}
              className="p-1 xsm:py-3 xsm:px-3 rounded-lg xsm:rounded-xl bg-brand-planbut"
            />
          </div>
          <h3 className="text-lg xsm:text-2xl font-semibold text-brand-head font-heading">
            Chat With Support
          </h3>
          <p className="text-brand-cartext mb-3">Speak to our friendly team</p>
          <p className="text-brand-midtext underline italic xsm:text-lg lg:text-xl">
            support@plannedrations.com
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 xsm:p-10 md:p-5 ml:p-10">
          <div className="mb-7 xsm:mb-14">
            <img
              src={Location}
              alt="Location"
              style={iconAnim(120)}
              className="p-1 xsm:py-3 xsm:px-3 rounded-lg xsm:rounded-xl bg-brand-planbut"
            />
          </div>
          <h3 className="text-lg xsm:text-2xl font-semibold text-brand-head font-heading">
            Visit us
          </h3>
          <p className="text-brand-cartext mb-3">Come say "Hi" at our office</p>
          <p className="text-brand-head xsm:text-lg lg:text-xl">
            390 NE, 191st St, Miami, Florida
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 xsm:p-10 md:p-5 ml:p-10">
          <div className="mb-7 xsm:mb-14">
            <img
              src={Support}
              alt="Support"
              style={iconAnim(240)}
              className="p-1 xsm:py-3 xsm:px-3 rounded-lg xsm:rounded-xl bg-brand-planbut"
            />
          </div>
          <h3 className="text-lg xsm:text-2xl font-semibold text-brand-head font-heading">
            Contact Sales
          </h3>
          <p className="text-brand-cartext mb-3">Speak to our sales experts</p>
          <p className="text-brand-midtext underline italic xsm:text-lg lg:text-xl">
            sales@plannedrations.com
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 xsm:p-10 md:p-5 ml:p-10">
          <div className="mb-7 xsm:mb-14">
            <img
              src={Follow}
              alt="Follow"
              style={iconAnim(360)}
              className="p-1 xsm:py-3 xsm:px-3 rounded-lg xsm:rounded-xl bg-brand-planbut"
            />
          </div>
          <h3 className="text-lg xsm:text-2xl font-semibold text-brand-head font-heading">
            Follow Us
          </h3>
          <p className="text-brand-cartext mb-3">Come say "Hi" at our office</p>
          <div className="text-brand-head xsm:text-lg lg:text-xl grid grid-cols-2 xsm:grid-cols-4 md:grid-cols-2 ls:flex flex-col ls:flex-row gap-3">
            <Link className={followLinkClass} to="/contact">
              Twitter
            </Link>
            <Link
              className={followLinkClass}
              to="https://www.instagram.com/plannedrations"
            >
              Instagram
            </Link>
            <Link className={followLinkClass} to="/contact">
              Facebook
            </Link>
            <Link className={followLinkClass} to="/contact">
              Youtube
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactHeroPage;
