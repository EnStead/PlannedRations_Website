import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import FooterMisc from "../Utility/FooterMisc";

const Layout = ({ children,isScrolled,setIsScrolled,Footerbg,LeftCard,Cursors,Tooltip, forceFixed, showFooter = true}) => {
  return (
    <>
      <Navbar isScrolled={isScrolled} setIsScrolled={setIsScrolled} forceFixed={forceFixed} />
        <main className='cnt'>{children}</main>
      <FooterMisc/>
      {showFooter && <Footer Footerbg={Footerbg} LeftCard={LeftCard} Cursor={Cursors} Tooltip={Tooltip} />}
    </>
  );
};

export default Layout;
