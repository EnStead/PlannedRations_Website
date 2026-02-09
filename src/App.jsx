import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./container/LandingPage";
import Blog from "./container/Blog";
import BlogPostSection from "./component/BlogPostSection";
import BlogFooterbg from "./assets/BlogFooterbg.jpg";
import PrivacyFooterbg from "./assets/PrivacyFooterbg.jpg";
import TermFooterbg from "./assets/TermFooterbg.jpg";
import BlogCursor from "./assets/BlogCursor.svg";
import TermCursor from "./assets/TermCursor.svg";
import Footerbg from "./assets/Footerbg.jpg";
import Cursor from "./assets/Cursor.svg";
import { useEffect, useState } from "react";
import Layout from "./container/Layout";
import ContactPage from "./container/ContactPage";
import Privacy from "./container/Privacy";
import Terms from "./container/Terms";
import ScrollToTop from "./Utility/ScrollToTop";
import { AuthProvider } from "./AdminDashboard/Context/AuthContext";
import { ToastProvider } from "./AdminDashboard/Context/ToastProvider";
import AdminDashboard from "./AdminDashboard/AdminComponents/AdminDashboard";

function AppContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // become fixed after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ToastProvider>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-brand-accent min-h-screen cnt">
              <Layout
                isScrolled={isScrolled}
                setIsScrolled={setIsScrolled}
                Footerbg={Footerbg}
                LeftCard="#76B1FF"
                Cursors={Cursor}
                Tooltip="#F9A720"
                showFooter={false}
              >
                <LandingPage
                  isScrolled={isScrolled}
                  setIsScrolled={setIsScrolled}
                />
              </Layout>
            </div>
          }
        />

        <Route
          path="/admin/*"
          element={
            <AuthProvider>
              <AdminDashboard isScrolled={isScrolled} />
            </AuthProvider>
          }
        />

        <Route
          path="/blog"
          element={
            <div className="cnt">
              <Layout
                isScrolled={isScrolled}
                setIsScrolled={setIsScrolled}
                Footerbg={BlogFooterbg}
                LeftCard="#F9A720"
                Cursors={BlogCursor}
                Tooltip="#9E78F6"
                showFooter={false}
              >
                <Blog />
              </Layout>
            </div>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <div className="cnt">
              <Layout
                Footerbg={BlogFooterbg}
                LeftCard="#F9A720"
                Cursors={BlogCursor}
                Tooltip="#9E78F6"
                forceFixed={true}
                showFooter={false}
              >
                <BlogPostSection />
              </Layout>
            </div>
          }
        />
        <Route
          path="/privacy"
          element={
            <Layout
              Footerbg={PrivacyFooterbg}
              LeftCard="#000"
              Cursors={Cursor}
              Tooltip="#F9A720"
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
              LeftCard="#7B61FF"
              Cursors={TermCursor}
              Tooltip="#EE542B"
              forceFixed={true}
            >
              <Terms />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="bg-brand-background1 cnt">
              <Layout
                isScrolled={isScrolled}
                setIsScrolled={setIsScrolled}
                Footerbg={BlogFooterbg}
                LeftCard="#F9A720"
                Cursors={BlogCursor}
                Tooltip="#9E78F6"
                showFooter={false}
              >
                <ContactPage />
              </Layout>
            </div>
          }
        />
      </Routes>
    </ToastProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "*",
    element: <AppContent />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
