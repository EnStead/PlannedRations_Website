import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./container/LandingPage"
import Blog from "./container/Blog";
import BlogPostSection from "./component/BlogPostSection";
import BlogFooterbg from './assets/BlogFooterbg.jpg'
import PrivacyFooterbg from './assets/PrivacyFooterbg.jpg'
import TermFooterbg from './assets/TermFooterbg.jpg'
import BlogCursor from './assets/BlogCursor.svg'
import TermCursor from './assets/TermCursor.svg'
import Footerbg from './assets/Footerbg.jpg'
import Cursor from './assets/Cursor.svg'
import { useEffect, useState } from "react";
import Layout from "./container/Layout";
import ContactPage from "./container/ContactPage";
import Privacy from "./container/Privacy";
import Terms from "./container/Terms";
import ScrollToTop from "./Utility/ScrollToTop";


function App() {

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 20); // become fixed after 50px scroll
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <Router>

      <ScrollToTop /> 


      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-brand-accent min-h-screen'">
              <Layout 
                isScrolled={isScrolled} 
                setIsScrolled={setIsScrolled} 
                Footerbg={Footerbg} 
                LeftCard='#76B1FF' 
                Cursors={Cursor} 
                Tooltip='#F9A720' 
              >
                <LandingPage isScrolled={isScrolled} setIsScrolled={setIsScrolled} />
              </Layout>
            </div>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout 
              isScrolled={isScrolled} 
              setIsScrolled={setIsScrolled} 
              Footerbg={BlogFooterbg} 
              LeftCard='#F9A720'
              Cursors={BlogCursor} 
              Tooltip='#9E78F6'  
            >
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Layout 
              Footerbg={BlogFooterbg} 
              LeftCard='#F9A720' 
              Cursors={BlogCursor} 
              Tooltip='#9E78F6' 
              forceFixed={true} 
            >
              <BlogPostSection />
            </Layout>
          }
        />
        <Route
          path="/privacy"
          element={
            <Layout 
              Footerbg={PrivacyFooterbg} 
              LeftCard='#000' 
              Cursors={Cursor} 
              Tooltip='#F9A720' 
              forceFixed={true} 
            >
              <Privacy />
            </Layout>
          }
        />
        <Route
          path="/term"
          element={
            <Layout 
              Footerbg={TermFooterbg} 
              LeftCard='#7B61FF' 
              Cursors={TermCursor} 
              Tooltip='#EE542B' 
              forceFixed={true} 
            >
              <Terms />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout 
              isScrolled={isScrolled} 
              setIsScrolled={setIsScrolled} 
              Footerbg={BlogFooterbg} 
              LeftCard='#F9A720' 
              Cursors={BlogCursor} 
              Tooltip='#9E78F6' 
            >
              <ContactPage />
            </Layout>
          }
        />
      </Routes>

    </Router>
  )
}

export default App
 