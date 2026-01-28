import Image from "../../assets/LoginImg.png";
import FooterLogo from "../../assets/FooterLogo.svg";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="p-4 sm:p-10 rounded-2xl">
      <div className="flex flex-col lg:flex-row h-auto lg:h-[90vh]">
        {/* LEFT SIDE – STATIC */}
        <div className="hidden lg:flex bg-brand-purpbg w-[50%] relative flex-col justify-center pt-20 pl-20 rounded-2xl">
          <div className="flex justify-start">
            <img src={FooterLogo} alt="Logo" />
          </div>

          <div className="w-full flex justify-end items-center overflow-hidden">
            <img src={Image} alt="Image" className="object-contain" />
          </div>
        </div>

        {/* RIGHT SIDE – DYNAMIC */}
        <div className="w-full lg:w-[50%] flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
