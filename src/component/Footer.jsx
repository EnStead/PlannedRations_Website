import AppStore from "../assets/AppStore.png";
import FooterStack from "../assets/FooterStack.svg";
import PlayStore from "../assets/Playstore.png";
import FooterLogo from "../assets/FooterLogo.svg";
import Twitter from "../assets/Twitter.svg";
import Instagram from "../assets/Instagram.svg";
import Facebook from "../assets/Facebook.svg";
import Youtube from "../assets/Youtube.svg";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Footer = ({ Footerbg, LeftCard, Cursor, Tooltip }) => {
  const data = [
    {
      icon: Twitter,
      link: "/",
    },
    {
      icon: Instagram,
      link: "https://www.instagram.com/plannedrations",
    },
    {
      icon: Facebook,
      link: "/",
    },
    {
      icon: Youtube,
      link: "/",
    },
  ];

  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [buttonLabel, setButtonLabel] = useState("Subscribe");
  const animationTimersRef = useRef([]);
  const animationRunRef = useRef(0);
  const buttonLabelRef = useRef("Subscribe");

  useEffect(() => {
    buttonLabelRef.current = buttonLabel;
  }, [buttonLabel]);

  const clearAnimationTimers = () => {
    animationTimersRef.current.forEach((timer) => clearTimeout(timer));
    animationTimersRef.current = [];
  };

  const wait = (ms) =>
    new Promise((resolve) => {
      const timer = setTimeout(resolve, ms);
      animationTimersRef.current.push(timer);
    });

  const typeText = async (target, speed, runId) => {
    for (let i = 1; i <= target.length; i++) {
      if (runId !== animationRunRef.current) return;
      setButtonLabel(target.slice(0, i));
      await wait(speed);
    }
  };

  const eraseText = async (text, speed, runId) => {
    for (let i = text.length; i >= 0; i--) {
      if (runId !== animationRunRef.current) return;
      setButtonLabel(text.slice(0, i));
      await wait(speed);
    }
  };

  const runSuccessButtonAnimation = async () => {
    clearAnimationTimers();
    const runId = ++animationRunRef.current;
    const startText = buttonLabelRef.current || "Subscribe";

    await eraseText(startText, 45, runId);
    await typeText("Subscribed", 70, runId);
    await wait(5000);
    await eraseText("Subscribed", 45, runId);
    await typeText("Subscribe", 70, runId);
  };

  useEffect(() => {
    return () => {
      animationRunRef.current += 1;
      clearAnimationTimers();
    };
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Reset previous alert
    setAlert({ type: "", message: "" });

    if (!email.trim()) {
      setAlert({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.plannedrations.com/api/web/newsletter/subscribe",
        { email },
      );

      // Assuming success if status is 200
      if (res.status === 200) {
        setAlert({
          type: "success",
          message: "✅ You’ve successfully subscribed!",
        });
        setEmail("");
        runSuccessButtonAnimation();
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setAlert({
        type: "error",
        message:
          error.response?.data?.message ||
          "❌ Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className=" w-full py-10 px-7 xsm:px-15 justify-between"
      style={{
        backgroundImage: `url(${Footerbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid w-full lg:grid-cols-3  gap-5 lg:gap-10 ">
        {/* Left Box */}
        <div
          className=" py-10 px-5 sm:px-5 lg:px-0 xls:px-7 rounded-2xl text-center flex flex-col justify-between"
          style={{
            backgroundImage: `url(${FooterStack})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: LeftCard,
          }}
        >
          <div>
            <h3 className="font-heading font-bold text-brand-carhead text-2xl sm:text-4xl mb-4">
              Smarter eating, less waste, more flavor.
            </h3>
            <p className=" text-brand-offwhite text-base sm:text-xl">
              PlannedRations helps you eat smarter with meal planning, nutrition
              tracking, and grocery management. Save time, cut waste, and enjoy
              personalized food.
            </p>
            <p className=" text-brand-offwhite text-xl font-bold mt-7 ">
              Download Our App
            </p>
            <div className="relative flex lg:flex-col xls:flex-row gap-4 mt-3 mb-4 xls:mb-0 justify-center">
              <img
                src={PlayStore}
                alt="Google Play"
                className="h-9 xsm:h-12 lg:w-fit lg:m-auto transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.28)] active:translate-y-0 active:scale-100 cursor-pointer"
              />
              <img
                src={AppStore}
                alt="App Store"
                className="h-9 xsm:h-12 lg:w-fit lg:m-auto transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.28)] active:translate-y-0 active:scale-100 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <img src={FooterLogo} alt="Logo" />
          </div>
        </div>

        {/* Right Side (split top + bottom) */}
        <div className="lg:col-span-2 grid grid-rows-[3fr_1.6fr] gap-10">
          {/* Top Box */}
          <div className="bg-brand-carhead p-7 xsm:p-13 rounded-xl flex flex-col md:flex-row justify-between gap-6 ">
            <div className="flex justify-between gap-6 ls:gap-12">
              <div>
                <h3 className="font-heading font-bold text-brand-cartext text-base mb-4">
                  Product
                </h3>
                <ul className="space-y-2 text-sm ssm:text-lg text-brand-subtext">
                  <li>
                    <Link className="hover:underline" to={`/`}>
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:underline" to={`/`}>
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:underline" to={`/`}>
                      Meal Plans
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:underline" to={`/`}>
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:underline" to="/blog">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading font-bold text-brand-cartext text-base mb-4">
                  Support
                </h3>
                <ul className="space-y-2 text-sm ssm:text-lg text-brand-subtext">
                  <li>
                    <Link className="hover:underline" to={`/contact`}>
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:underline" to={`/term`}>
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:underline" to={`/privacy`}>
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-xl sm:text-3xl text-brand-gray mb-4 ">
                Get notified when we launch
              </h2>
              <p className="font-sans text-brand-grey  font-normal mb-6 sm:mb-12">
                Stay up to date with the latest news, announcements, and
                articles.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-wrap items-center gap-3 w-full max-w-md"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-full border text-brand-head border-gray-300 
                                focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-full bg-brand-secondary text-white font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)] hover:brightness-110 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {loading ? "Subscribing..." : buttonLabel}
                </button>
              </form>

              {alert.message && (
                <p
                  className={`mt-3 text-sm font-medium ${
                    alert.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {alert.message}
                </p>
              )}
            </div>
          </div>

          <div
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              cursor: `url("${Cursor}") 16 16, auto`,
            }}
          >
            {/* Bottom Box */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 h-70 md:h-40">
              {data.map((data, i) => (
                <div
                  key={i}
                  className="bg-brand-carhead rounded-2xl flex items-center justify-center p-2"
                >
                  <Link
                    className="hover:scale-200"
                    to={data.link}
                    style={{ cursor: `url("${Cursor}") 16 16, auto` }}
                  >
                    <img src={data.icon} alt="Social icon" className="w-14" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Floating cursor label */}
            {isHovering && (
              <div
                className="pointer-events-none fixed text-lg font-semibold font-heading border-brand-carhead border-2 text-brand-carhead bg-brand-midtext  px-4 py-1 rounded-xl shadow-lg transition-transform duration-100"
                style={{
                  top: `${mousePos.y + 20}px`,
                  left: `${mousePos.x + 20}px`,
                  backgroundColor: Tooltip,
                }}
              >
                Follow Us
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="font-medium text-brand-muted text-center mt-8">
        © 2025 Plannedrations. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
