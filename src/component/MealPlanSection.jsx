import Doodle from '../assets/Doodle/Group (1).svg'
import Doodle1 from '../assets/Doodle/Group (2).svg'
import Doodle30 from '../assets/Doodle/Group (3).svg'
import Doodle3 from '../assets/Doodle/Group (4).svg'
import Doodle4 from '../assets/Doodle/Group (5).svg'
import Doodle5 from '../assets/Doodle/Group (6).svg'
import Doodle6 from '../assets/Doodle/Group (7).svg'
import Doodle7 from '../assets/Doodle/Group (8).svg'
import Doodle8 from '../assets/Doodle/Group (9).svg'
import Doodle9 from '../assets/Doodle/Group (10).svg'
import Doodle10 from '../assets/Doodle/Group (11).svg'
import Doodle11 from '../assets/Doodle/Group (12).svg'
import Doodle12 from '../assets/Doodle/Group (13).svg'
import Doodle13 from '../assets/Doodle/Group (14).svg'
import Doodle14 from '../assets/Doodle/Group (15).svg'
import Doodle15 from '../assets/Doodle/Group (16).svg'
import Doodle16 from '../assets/Doodle/Group (17).svg'
import Doodle17 from '../assets/Doodle/Group (18).svg'
import Doodle18 from '../assets/Doodle/Group (19).svg'
import Doodle19 from '../assets/Doodle/Group (20).svg'
import Doodle20 from '../assets/Doodle/Group (21).svg'
import Doodle21 from '../assets/Doodle/Group (22).svg'
import Doodle22 from '../assets/Doodle/Group (23).svg'
import Doodle23 from '../assets/Doodle/Group (24).svg'
import Doodle24 from '../assets/Doodle/Group (25).svg'
import Doodle25 from '../assets/Doodle/Group (26).svg'
import Doodle26 from '../assets/Doodle/Group (27).svg'
import Doodle27 from '../assets/Doodle/Group (28).svg'
import Doodle28 from '../assets/Doodle/Group (29).svg'
import Doodle29 from '../assets/Doodle/Group (30).svg'
import Doodle31 from '../assets/Doodle/Group (31).svg'
import Doodle32 from '../assets/Doodle/Group (32).svg'
import Doodle33 from '../assets/Doodle/Group (33).svg'
import Doodle34 from '../assets/Doodle/Group (34).svg'
import Doodle35 from '../assets/Doodle/Group (35).svg'
import Doodle36 from '../assets/Doodle/Group (36).svg'
import Doodle37 from '../assets/Doodle/Group (37).svg'
import Doodle38 from '../assets/Doodle/Group (38).svg'
import Doodle39 from '../assets/Doodle/Group (39).svg'
import Doodle40 from '../assets/Doodle/Group (40).svg'
import Doodle41 from '../assets/Doodle/Group (41).svg'
import Doodle42 from '../assets/Doodle/Group (42).svg'
import Doodle43 from '../assets/Doodle/Group (43).svg'
import Doodle44 from '../assets/Doodle/Group (44).svg'
import Doodle45 from '../assets/Doodle/Group (45).svg'
import Doodle46 from '../assets/Doodle/Group (46).svg'
import Doodle47 from '../assets/Doodle/Group.svg'
import Doodle48 from '../assets/Doodle/Group (1).png'
import Doodle2 from '../assets/Doddle2.svg'
import You from '../assets/You.png'
import PlanCarousel from '../Utility/PlanCarousel'
import MealPlanDeets from './MealPlanDeets'
import { useState, useEffect, useMemo, useRef } from 'react'

const TypewriterText = ({ text, startTyping }) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!startTyping) {
      setDisplayText("");
      setIsAnimating(false);
      return;
    }

    let timeout;
    let index = 0;
    setIsAnimating(true);

    const loop = () => {
      setDisplayText(text.slice(0, index));
      index += 1;
      if (index <= text.length) {
        timeout = setTimeout(loop, 55);
      } else {
        setIsAnimating(false);
      }
    };

    loop();

    return () => clearTimeout(timeout);
  }, [startTyping, text]);

  return (
    <span className="inline-flex items-end whitespace-pre-line">
      {displayText}
      {isAnimating && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] bg-current animate-pulse" />
      )}
    </span>
  );
};

const MealPlanSection = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const doodleAssets = [
    Doodle,
    Doodle1,
    Doodle30,
    Doodle3,
    Doodle4,
    Doodle5,
    Doodle6,
    Doodle7,
    Doodle8,
    Doodle9,
    Doodle10,
    Doodle11,
    Doodle12,
    Doodle13,
    Doodle14,
    Doodle15,
    Doodle16,
    Doodle17,
    Doodle18,
    Doodle19,
    Doodle20,
    Doodle21,
    Doodle22,
    Doodle23,
    Doodle24,
    Doodle25,
    Doodle26,
    Doodle27,
    Doodle28,
    Doodle29,
    Doodle31,
    Doodle32,
    Doodle33,
    Doodle34,
    Doodle35,
    Doodle36,
    Doodle37,
    Doodle38,
    Doodle39,
    Doodle40,
    Doodle41,
    Doodle42,
    Doodle43,
    Doodle44,
    Doodle45,
    Doodle46,
    Doodle47,
    Doodle48,
  ];
  const doodleCloud = [...doodleAssets, ...doodleAssets.slice(0, 22)];

  const initialDoodleLayout = useMemo(() => {
    let seed = 87423;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const between = (min, max) => min + rand() * (max - min);
    const placed = [];

    return doodleCloud.map((_, index) => {
      const size = index % 9 === 0 ? between(58, 78) : between(26, 52);
      let x = between(6, 94);
      let y = between(8, 92);
      let tries = 0;

      while (tries < 140) {
        const outsideCut = rand() < 0.2;
        x = outsideCut ? between(-8, 108) : between(6, 94);
        y = outsideCut ? between(-8, 108) : between(8, 92);

        const overlaps = placed.some((p) => {
          const dx = x - p.x;
          const dy = y - p.y;
          const minDist = (size + p.size) * 0.13;
          return dx * dx + dy * dy < minDist * minDist;
        });

        if (!overlaps) break;
        tries += 1;
      }

      const rotation = between(-28, 28);
      const spec = { x, y, size, rotation };
      placed.push(spec);
      return spec;
    });
  }, [doodleCloud]);

  const initialDoodleLayoutCard3 = useMemo(() => {
    let seed = 129731;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const between = (min, max) => min + rand() * (max - min);
    const placed = [];

    return doodleCloud.map((_, index) => {
      const size = index % 8 === 0 ? between(56, 76) : between(24, 50);
      let x = between(6, 94);
      let y = between(8, 92);
      let tries = 0;

      while (tries < 140) {
        const outsideCut = rand() < 0.2;
        x = outsideCut ? between(-8, 108) : between(6, 94);
        y = outsideCut ? between(-8, 108) : between(8, 92);

        const overlaps = placed.some((p) => {
          const dx = x - p.x;
          const dy = y - p.y;
          const minDist = (size + p.size) * 0.13;
          return dx * dx + dy * dy < minDist * minDist;
        });

        if (!overlaps) break;
        tries += 1;
      }

      const rotation = between(-28, 28);
      const spec = { x, y, size, rotation };
      placed.push(spec);
      return spec;
    });
  }, [doodleCloud]);

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

  return (
    <div id='plans' ref={sectionRef} className='pt-37 pb-5 relative bg-brand-carhead'>
        {/* HIDEN SECTION*/}
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
                    <div className="group relative ml:flex-1 bg-brand-orange shadow rounded-xl overflow-hidden flex flex-col h-[500px] ssm:h-[600px] text-center justify-end"
                    >
                        {/* Doodle Icons - Insert your icons here */}
                        <div className="absolute inset-0 pointer-events-none z-20">
                          {doodleCloud.map((item, index) => (
                            <img
                              key={index}
                              src={item}
                              alt={`doodle-${index + 1}`}
                              className="absolute pointer-events-auto transition-transform duration-300 ease-out hover:scale-125"
                              style={{
                                top: `${initialDoodleLayout[index].y}%`,
                                left: `${initialDoodleLayout[index].x}%`,
                                width: `${initialDoodleLayout[index].size}px`,
                                height: `${initialDoodleLayout[index].size}px`,
                                opacity: isInView ? 0.2 : 0,
                                transform: isInView
                                  ? `translate(-50%, -50%) rotate(${initialDoodleLayout[index].rotation}deg)`
                                  : `translate(-50%, -220%) rotate(${initialDoodleLayout[index].rotation}deg)`,
                                transition: `transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1), opacity 500ms ease-out`,
                                transitionDelay: `${(index % 18) * 35}ms`,
                              }}
                            />
                          ))}
                        </div>
                        <div className="relative px-5 ssm:px-10 ml:px-3 lg:px-5 xl:px-10 py-5 text-center z-10">
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
                            <h3 className="text-3xl text-brand-carhead font-heading font-semibold min-h-[3em]">
                                <TypewriterText text={"Planned just for \n YOU!"} startTyping={isInView} />
                            </h3>
                            
                        </div>
                    </div>
        
                    {/* Card3 */}
                    <div className="group relative ml:flex-1 bg-brand-purple shadow rounded-xl overflow-hidden flex flex-col h-[500px] ssm:h-[600px] text-center justify-end"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                            
                        ></div>
                        <div className="absolute inset-0 pointer-events-none z-10">
                          {doodleCloud.map((item, index) => (
                            <img
                              key={`card3-${index}`}
                              src={item}
                              alt={`card3-doodle-${index + 1}`}
                              className="absolute pointer-events-auto transition-transform duration-300 ease-out hover:scale-125"
                              style={{
                                top: `${initialDoodleLayoutCard3[index].y}%`,
                                left: `${initialDoodleLayoutCard3[index].x}%`,
                                width: `${initialDoodleLayoutCard3[index].size}px`,
                                height: `${initialDoodleLayoutCard3[index].size}px`,
                                opacity: isInView ? 0.2 : 0,
                                transform: isInView
                                  ? `translate(-50%, -50%) rotate(${initialDoodleLayoutCard3[index].rotation}deg)`
                                  : `translate(-50%, -220%) rotate(${initialDoodleLayoutCard3[index].rotation}deg)`,
                                transition: `transform 720ms cubic-bezier(0.2, 0.7, 0.2, 1), opacity 520ms ease-out`,
                                transitionDelay: `${(index % 18) * 35}ms`,
                              }}
                            />
                          ))}
                        </div>
                        <div className="relative px-5 ssm:px-10 ml:px-3 lg:px-5 xl:px-10 py-5 text-center">
                            <h3 className="text-xl sm:text-3xl text-brand-carhead font-heading font-semibold">Meals That Fit You</h3>
                            <p className="text:lg sm:text-2xl text-brand-planoff font-sans">
                                Get ready-to-cook recipes, grocery lists, and nutrition insights for your lifestyle.
                            </p>
                        </div>
                    </div>
                </div>
        
            </div>            

        </div>

        {/* HIDEN SECTION*/}
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
