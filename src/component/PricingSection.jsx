import { useState, useEffect, useRef } from "react";
import PricingVector from "../assets/PricingVector.svg";
// import Phone from "../assets/PhoneMockup.png";

const packages = [
  {
    title: "1 Month",
    tag: "Most Flexible",
    color: "#F9A720",
    bill: "$4.99",
    billing: "billed monthly",
    desc: "Experience all premium features without any commitment. Monitor your nutrition, plan meals more effectively, and reduce waste, all for the cost of a coffee. Cancel anytime, hassle-free.",
  },
  {
    title: "3 Months",
    tag: "Most Popular",
    color: "#D5C4FB",
    bill: "$13.99",
    billing: "billed quarterly",
    billtext: "$4.66 /month, save 10%",
    desc: "Quarterly billing gives you flexibility without the hassle of renewing each month. Stay on track with your goals and unlock smarter planning at a reduced rate.",
  },
  {
    title: "12 Months",
    tag: "Best Value",
    color: "#76B1FF",
    bill: "$49.99",
    billing: "billed annually",
    billtext: "$4.12 /month, save 15%",
    desc: "Enjoy a full year of premium access at the best monthly rate. Ideal for those who plan ahead and want all the features without the hassle of renewals.",
  },
  {
    title: "Family Plan",
    tag: "Save Big Together",
    color: "#74C460",
    bill: "$24.99",
    billing: "billed monthly",
    billtext: "$4.12 /member, save 12%",
    desc: "Include up to 6 family members on a single plan. Everyone receives their own tailored meal tracking and grocery lists, all for a shared affordable rate.",
  },
];

const TypewriterText = ({ text, startTyping }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!startTyping) {
      setDisplayText(text);
      setIsAnimating(false);
      return;
    }

    let timeout;
    let currentText = text;
    let isDeleting = true;
    setIsAnimating(true);

    const loop = () => {
      if (isDeleting) {
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1);
          setDisplayText(currentText);
          timeout = setTimeout(loop, 50);
        } else {
          isDeleting = false;
          timeout = setTimeout(loop, 200);
        }
      } else {
        if (currentText.length < text.length) {
          currentText = text.slice(0, currentText.length + 1);
          setDisplayText(currentText);
          timeout = setTimeout(loop, 50);
        } else {
          setIsAnimating(false);
        }
      }
    };

    loop();

    return () => clearTimeout(timeout);
  }, [startTyping, text]);

  return (
    <span className="inline-flex items-end">
      {displayText}
      {isAnimating && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] bg-current animate-pulse" />
      )}
    </span>
  );
};

const PricingSection = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    setActiveTypeIndex(0);
    const timer = setInterval(() => {
      setActiveTypeIndex((prev) => (prev + 1) % packages.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-27 px-7 xsm:px-15 min-h-[100vh] 
        z-10
        transition-discrete rounded-b-[100px] overflow-hidden
      "
      style={{
        transition: "background 1s ease-in-out",
        background: `linear-gradient(to bottom, black 40%, transparent 100%),
            radial-gradient(ellipse farthest-corner at center bottom, #F9A720 50%, black 80%)`,
      }}
    >
      <div className="absolute inset-0 z-0 opacity-5">
        <img
          src={PricingVector}
          alt="Pricing Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="font-heading font-bold text-3xl sm:text-5xl text-brand-carhead">
          Simple Pricing, One Premium Experience.
        </h2>
        <p className="font-sans text-brand-offwhite font-normal text-lg sm:text-2xl my-4">
          Choose the plan that fits your lifestyle — enjoy every <br /> feature
          with a 14-day free trial.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 ml:grid-cols-2 gap-6 max-w-full mx-auto">
        {packages.map((p, i) => (
          <div
            key={i}
            className=" p-4 ssm:p-8 xsm:p-16 ml:p-5 lg:p-10 xl:p-16 rounded-3xl
              bg-black/40 backdrop-blur-md text-center cursor-pointer 
              transition-all duration-500 border border-brand-carhead/40 hover:scale-105 hover:shadow-2xl"
          >
            <span
              className=" flex items-center gap-2 font-heading 
                font-semibold justify-center border 
                w-fit rounded-2xl px-2 bg/20 m-auto"
              style={{
                color: p.color,
                borderColor: p.color,
                backgroundColor: `${p.color}20`,
              }}
            >
              <span className=" text-lg xsm:text-2xl">&#128972;</span>{" "}
              <TypewriterText
                text={p.tag}
                startTyping={isInView && activeTypeIndex === i}
              />
            </span>
            <h3 className="text-lg xsm:text-2xl font-bold font-heading text-brand-carhead my-7">
              {" "}
              {p.title}
            </h3>
            <p className="border-y text-brand-planoff border-brand-carhead/40 py-3 text-sm xsm:text-base ">
              {p.desc}
            </p>
            <div className="flex items-center justify-between gap-4 mt-6">
              {/* Billed monthly text */}
              <div className="">
                <p className="font-heading flex items-end">
                  <span className="text-brand-carhead text-lg xsm:text-2xl ">
                    {p.bill}
                  </span>
                  <span className="text-brand-planmid text-sm xsm:text-base">
                    {p.billing}
                  </span>
                </p>
                <p className="text-brand-planoff text-xs xsm:text-sm text-left font-heading">
                  {p.billtext}
                </p>
              </div>
              {/* Button */}
              <button className="bg-brand-secondary text-white xsm:px-10  px-5 py-3 rounded-2xl font-medium text-sm">
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
