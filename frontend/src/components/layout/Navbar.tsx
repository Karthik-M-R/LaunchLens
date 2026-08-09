import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b-3 border-black bg-amber-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-32 max-w-7xl items-center justify-between px-6">
        

        <Link to="/" className="flex items-center transition-transform hover:scale-105">
          <img 
            src={logo} 
            alt="LaunchLens Logo" 
            className="h-28 max-h-32 w-auto object-contain drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex font-black text-black">
          {/* <a
            href="#features"
            className="transition-all hover:text-indigo-600 hover:underline decoration-wavy underline-offset-4"
          >
            Features
          </a> */}

          <a
            href="#about"
            className="transition-all hover:text-indigo-600 hover:underline decoration-wavy underline-offset-4"
          >
            About
          </a>

          <a
            href="#workflow"
            className="transition-all hover:text-indigo-600 hover:underline decoration-wavy underline-offset-4"
          >
            Workflow
          </a>
        </div>

        {/* Buttons (Neobrutal Cartoon Style) */}
        <div className="flex items-center gap-3 font-black">
          {/* Login Button */}
          <Link
            to="/login"
            className="rounded-xl border-2 border-black bg-white px-5 py-2.5 text-sm text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-yellow-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Login
          </Link>

          {/* Sign Up Button */}
          <Link
            to="/signup"
            className="rounded-xl border-2 border-black bg-indigo-400 px-5 py-2.5 text-sm text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-indigo-300 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;