import type { ReactNode } from "react";
import logo from "../../assets/logo/logo.png";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

const AuthLayout = ({
  title,
  subtitle,
  children,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-amber-50">

      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden items-center justify-center p-12 lg:flex">

          <div className="max-w-lg">

            <img
              src={logo}
              alt="LaunchLens"
              className="h-24"
            />

            <h1 className="mt-10 text-5xl font-black leading-tight">

              Know Exactly Which Marketing Campaigns Drive Results.

            </h1>

            <p className="mt-8 text-lg font-semibold leading-8 text-gray-700">

              Create campaign-specific tracking links,
              measure performance,
              and receive AI-powered marketing insights.

            </p>

            <div className="mt-12 rounded-3xl border-4 border-black bg-cyan-300 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

              🚀

              <span className="ml-3 font-black">

                Trusted by founders, creators & indie hackers

              </span>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center justify-center p-6">

          <div className="w-full max-w-md rounded-[32px] border-4 border-black bg-white p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

            <h2 className="text-4xl font-black">

              {title}

            </h2>

            <p className="mt-3 font-semibold text-gray-600">

              {subtitle}

            </p>

            <div className="mt-10">

              {children}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;