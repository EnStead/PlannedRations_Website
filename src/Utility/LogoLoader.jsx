import Logo from "../assets/Logo.svg";

const LogoLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={Logo} alt="Loading..." className="w-56 h-56 animate-pulse" />
    </div>
  );
};

export default LogoLoader;
