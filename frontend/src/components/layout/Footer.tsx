import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const Footer = () => {
  return (
    <footer className="border-t-4 border-black bg-amber-200 py-14">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 lg:flex-row">

        {/* Left */}

        <div>

          <div className="flex items-center gap-3">

            <img
              src={logo}
              alt="LaunchLens"
              className="h-12"
            />



          </div>

          <p className="mt-5 max-w-md text-lg font-semibold text-gray-700">

            Know Exactly Which Marketing Campaigns
            Drive Results.

          </p>

        </div>

        {/* Middle */}

        <div className="flex gap-8 font-black">

          {/* <a href="#features">

            Features

          </a> */}

          <a href="#workflow">

            Workflow

          </a>

          <Link to="/login">

            Login

          </Link>

          <Link to="/signup">

            Signup

          </Link>

        </div>

      </div>

      <div className="mt-12 border-t-2 border-black pt-6 text-center">

        <p className="font-bold">

          Made with ❤️ by Karthik

        </p>

        <p className="mt-2 text-sm">

          © 2026 LaunchLens. All rights reserved.

        </p>

      </div>

    </footer>
  );
};

export default Footer;