import Logo from '../../assets/Logo.svg'
import Avater from '../../assets/Avater.jpg'
import Logout from '../../assets/Logout.svg'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { useToast } from '../Context/ToastProvider'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from 'react';

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "My Users" },
  { to: "/admin/posts", label: "Content Hub" },
  {
    label: "Food Library",
    children: [
      { to: "/admin/recipes", label: "Recipes" },
      { to: "/admin/ingredients", label: "Ingredients" },
    ],
  },
  { to: "/admin/tags", label: "Tags & Category" },
];

const NavDropdown = ({ item, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger className={`flex items-center gap-1 outline-none transition py-2 pr-2 pl-2 ${isActive ? "text-brand-carhead bg-brand-darkpurple py-1 px-4 rounded-2xl font-medium" : "text-brand-muted p-0"}`}>
        {item.label} <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white rounded-xl shadow-lg p-2 min-w-[160px] z-50 mt-2 border border-gray-100" align="start" sideOffset={5}>
          {item.children.map((child) => (
            <DropdownMenu.Item key={child.to} asChild className='flex flex-col'>
              <NavLink to={child.to} className={({isActive}) => `block px-4 py-2 text-sm rounded-lg hover:bg-brand-secondary/30 outline-none cursor-pointer ${isActive ? "text-brand-primary font-medium bg-gray-50" : "text-brand-subtext"}`}>
                {child.label}
              </NavLink>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const AdminNavbar = ({isScrolled}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

  const handleLogout = () => {
    logout();

    showToast({
      title: "Logged out",
      description: "You have been logged out successfully",
      variant: "success",
    });

    navigate("/admin");
  };

  return (
    <nav
      className={`w-full transition-all duration-500 z-50 font-sans px-10 ${
        isScrolled
          ? "fixed top-3 bg-brand-carhead shadow h-22 rounded-[48px]  left-0 right-0   "
          : "relative bg-transparent h-24 shadow-md" 
      }`}
    >
      <div className="flex justify-between items-center py-4">
        <img src={Logo} alt='Logo' onClick={() => navigate("/")} className="cursor-pointer" />
        
        {/* Desktop Menu */}
        <ul className= {`hidden lg:flex gap-7 text-sm sm:text-xs lg:gap-10 font-normal lg:text-base transition-all duration-300 bg-brand-offwhite rounded-2xl
           text-brand-muted`}
        >
          {NAV_ITEMS.map((item, index) => {
            if (item.children) {
              const isActive = item.children.some((child) =>
                location.pathname.startsWith(child.to)
              );
              return (
                <li key={index}>
                  <NavDropdown item={item} isActive={isActive} />
                </li>
              );
            }
            return (
            <li key={item.to || index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `relative inline-block transition py-2 pr-2 pl-2 ${
                    isActive
                      ? "text-brand-carhead bg-brand-darkpurple py-1 px-4 rounded-2xl font-medium"
                      : "text-brand-muted p-0"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          )})}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden lg:flex gap-6">
          <button  onClick={handleLogout} className='flex text-brand-red font-medium w-fit items-center gap-2'>
            <img src={Logout} alt="Image" className='w-5  ' />
            <p className='text-sm' >Log Out</p>
          </button>
            <img src={Avater} alt="Image" className='w-10 rounded-full border border-brand-darkpurple' />
        
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-brand-primary p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>

        {/* Mobile Menu Overlay & Drawer */}
        <div className={`fixed inset-0 z-[60] lg:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className={`absolute top-0 right-0 h-full w-[80%] max-w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <img src={Logo} alt="Logo" className="w-24" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-brand-muted hover:text-brand-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <ul className="flex flex-col gap-4 overflow-y-auto flex-1">
                {NAV_ITEMS.map((item, index) => {
                  if (item.children) {
                    return (
                      <li key={index} className="flex flex-col">
                        <button 
                          onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                          className={`flex items-center justify-between py-2 text-base font-medium ${mobileSubmenuOpen ? 'text-brand-primary' : 'text-brand-muted'}`}
                        >
                          {item.label}
                          <ChevronDown size={16} className={`transition-transform duration-200 ${mobileSubmenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <div className={`flex flex-col gap-2 pl-4 overflow-hidden transition-all duration-300 ${mobileSubmenuOpen ? 'max-h-40 mt-2' : 'max-h-0'}`}>
                          {item.children.map((child) => (
                            <NavLink 
                              key={child.to}
                              to={child.to}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={({isActive}) => `py-2 text-sm ${isActive ? 'text-brand-primary font-medium' : 'text-brand-subtext'}`}
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      </li>
                    );
                  }
                  return (
                    <li key={index}>
                      <NavLink
                        to={item.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) => `block py-2 text-base font-medium ${isActive ? "text-brand-primary" : "text-brand-muted"}`}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={Avater} alt="Avatar" className='w-10 h-10 rounded-full border border-brand-darkpurple' />
                  <span className="text-sm font-medium text-brand-primary">Admin</span>
                </div>
                <button onClick={handleLogout} className='text-brand-red p-2 hover:bg-red-50 rounded-lg transition-colors'>
                  <img src={Logout} alt="Logout" className='w-5' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar