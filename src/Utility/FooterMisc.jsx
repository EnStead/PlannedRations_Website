import Logo from '../assets/Logo.svg'
import Facebook from '../assets/Facebook.svg'
import Instagram from '../assets/Instagram.svg'
import Twitter from '../assets/Twitter.svg'
import Youtube from '../assets/Youtube.svg'


const FooterMisc = () => {
  return (
    <footer className="bg-white text-white py-6 px-5 sm:px-10">
        <div className="max-w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left: Social Media Icons */}
            <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noopener noreferrer">
                <img src={Facebook} alt="Facebook" className="h-6 w-6 hover:opacity-80 transition" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
                <img src={Twitter} alt="Twitter" className="h-6 w-6 hover:opacity-80 transition" />
            </a>
            <a href="https://www.instagram.com/plannedrations" target="_blank" rel="noopener noreferrer">
                <img src={Instagram} alt="Instagram" className="h-6 w-6 hover:opacity-80 transition" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
                <img src={Youtube} alt="Youtube" className="h-6 w-6 hover:opacity-80 transition" />
            </a>
            </div>

            {/* Center: Logo */}
            <div>
                <img src={Logo} alt='Logo' className="cursor-pointer" />
            </div>

            {/* Right: Copyright */}
            <div className="text-sm text-brand-muted text-center md:text-right">
                &copy; {new Date().getFullYear()} Plannedrations. All rights reserved.
            </div>

        </div>
    </footer>
  )
}

export default FooterMisc