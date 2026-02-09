import React, { useState, useEffect } from "react";
import Logo from '../assets/Logo.svg'
import { useLocation, useNavigate } from "react-router-dom";


const Navbar = ({isScrolled, setIsScrolled, forceFixed}) => {

  const navigate = useNavigate();
  const location = useLocation();

 // Robust scroll: accounts for navbar height and cross-route fallback
  const handleScrollTo = (id) => {
    const doScroll = () => {
      const el = document.getElementById(id);
      if (!el) {
        console.warn(`[Navbar] no element found with id="${id}"`);
        return;
      }

      // compute navbar height (if present)
      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
      const offset = 12; // extra spacing in px

      // final Y to scroll to:
      const targetY = el.getBoundingClientRect().top + window.pageYOffset - navHeight - offset;

      window.scrollTo({ top: targetY, behavior: "smooth" });
    };

    // If we are not on the landing page ("/"), navigate there first then scroll after small delay
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      // wait a tiny bit for route mount and DOM to be present, then scroll
      setTimeout(doScroll, 120);
    } else {
      doScroll();
    }
  };

  return (
    <nav
      className={`w-full transition-all duration-500 z-50 font-sans ${
        isScrolled || forceFixed
          ? " ml:max-w-[1400px] fixed top-3 bg-brand-carhead/90 shadow h-22 rounded-[48px] max-w-[700px] mx-auto left-0 right-0   "
          : "relative bg-transparent h-20" 
      }`}
    >
      <div className="max-w-7xl cnt_nav mx-auto flex justify-between items-center p-4">
        <img src={Logo} alt='Logo' onClick={() => navigate("/")} className="cursor-pointer" />
        {/* HIDEN SECTION */}
        {/* <ul className={`hidden gap-7 text-sm ml:flex sm:text-xs lg:gap-10 font-normal py-4 px-5 rounded-2xl lg:text-base transition-all duration-300
            ${isScrolled ? "bg-transparent" : "bg-brand-carhead text-brand-subtext"}
          `}
        >
          <li className="cursor-pointer" onClick={() => handleScrollTo("how-it-works")} >How It Works</li>
          <li className="cursor-pointer" onClick={() => handleScrollTo("features")} >Features</li>
          <li className="cursor-pointer" onClick={() => handleScrollTo("pricing")} >Pricing</li>
          <li className="cursor-pointer" onClick={() => handleScrollTo("faq")} >FAQ</li>
          <li className="cursor-pointer" onClick={() => navigate("/blog")} >Blogs</li>
          <li className="cursor-pointer" onClick={() => navigate("/contact")} >Contact Us</li>
        </ul> */}
        <button onClick={() => navigate("/contact")} className="bg-brand-secondary text-white px-10 py-4 rounded-2xl font-medium text-sm cursor-pointer">
          {/* Download App */}
          Contact Us
        </button>
      </div>
    </nav>
  )
}

export default Navbar