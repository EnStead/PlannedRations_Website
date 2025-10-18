import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Layout = ({ children,isScrolled,setIsScrolled,Footerbg,LeftCard,Cursors,Tooltip, forceFixed}) => {
  return (
    <>
      <Navbar isScrolled={isScrolled} setIsScrolled={setIsScrolled} forceFixed={forceFixed} />
        <main>{children}</main>
      <Footer Footerbg={Footerbg} LeftCard={LeftCard} Cursor={Cursors} Tooltip={Tooltip} />
    </>
  );
};

export default Layout;
