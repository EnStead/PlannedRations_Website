import Logo from '../../assets/Logo.svg'
import Avater from '../../assets/Avater.jpg'
import Logout from '../../assets/Logout.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { useToast } from '../Context/ToastProvider'


const AdminNavbar = ({isScrolled}) => {

  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showToast } = useToast();

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
        <ul className= {`gap-7 text-sm ml:flex sm:text-xs lg:gap-10 font-normal py-4 px-2 lg:text-base transition-all duration-300
           text-brand-muted`}
        >
          {[
            { to: "/admin/dashboard", label: "Dashboard" },
            { to: "/admin/users", label: "User Management" },
            { to: "/admin/posts", label: "Blogs & Article" },
            { to: "/admin/recipes", label: "Recipes" },
            { to: "/admin/ingredients", label: "Ingredients" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `relative inline-block transition ${
                    isActive
                      ? "text-brand-carhead bg-brand-darkpurple py-1 px-4 rounded-2xl font-medium"
                      : "text-brand-muted p-0"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex gap-6">
          <button  onClick={handleLogout} className='flex text-brand-red font-medium w-fit items-center gap-2'>
            <img src={Logout} alt="Image" className='w-5  ' />
            <p className='text-sm' >Log Out</p>
          </button>
            <img src={Avater} alt="Image" className='w-10 rounded-full border border-brand-darkpurple' />
        
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar