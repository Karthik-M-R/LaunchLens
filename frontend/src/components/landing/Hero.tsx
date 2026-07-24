import { ArrowRight, Play, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-amber-50/60 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-16 lg:flex-row">

        {/* Left Side */}
        <div className="flex-1">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-black bg-yellow-300 px-4 py-2 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles size={18} className="text-black" />
            Marketing Attribution Made Simple
          </div>

          {/* Heading with Cartoon Highlights */}
          <h1 className="text-5xl font-black leading-tight text-black lg:text-6xl">
            Know Exactly{" "}
            <br />
            Which Marketing{" "}
            <span className="relative inline-block -rotate-1 rounded-2xl border-4 border-black bg-indigo-400 px-3 py-1 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Campaigns
            </span>
            <br />
            Drive Results.
          </h1>

          {/* Body Text */}
          <p className="mt-8 max-w-xl text-lg font-bold leading-8 text-gray-800">
            LaunchLens helps solopreneurs, indie hackers, and small startups
            track every link, cut out wasted ad spend
            measure every campaign using smart tracking links,
            real-time analytics, and AI-powered insights.
          </p>
   
          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            {/* Primary Action Button */}
            <button className="flex items-center gap-2 rounded-2xl border-4 border-black bg-indigo-500 px-8 py-4 text-lg font-black text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              Get Started
              <ArrowRight size={22} strokeWidth={3} />
            </button>

            {/* Secondary Action Button */}
            <button className="flex items-center gap-2 rounded-2xl border-4 border-black bg-white px-8 py-4 text-lg font-black text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-purple-200 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <Play size={20} strokeWidth={3} fill="currentColor" />
              Live Demo
            </button>

          </div>

          {/* Footer Tag */}
          <div className="mt-8 inline-block rounded-xl border-2 border-black bg-pink-200 px-4 py-2 font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            🚀 Built for Startups • Creators • Indie Hackers
          </div>

        </div>

        {/* Right Side - Cartoon Dashboard Card */}
        <div className="relative flex-1">

          {/* Background Decorative Sticker Blob */}
          <div className="absolute -left-6 -top-6 h-72 w-72 rounded-3xl border-4 border-black bg-cyan-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />

          {/* Main Card */}
          <div className="relative rotate-2 rounded-3xl border-4 border-black bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-0">

            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-black text-black">
                Campaign Analytics
              </h3>

              <span className="rounded-full border-2 border-black bg-green-400 px-4 py-1 text-xs font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                LIVE 🔴
              </span>
            </div>

            {/* Progress Bars with Chunky Outlines */}
            <div className="space-y-6 font-black">

              <div>
                <div className="mb-2 flex justify-between text-black">
                  <span>X</span>
                  <span>1,240</span>
                </div>
                <div className="h-5 rounded-full border-2 border-black bg-gray-100 p-0.5">
                  <div className="h-full w-3/4 rounded-full border-2 border-black bg-cyan-400"></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-black">
                  <span>Reddit</span>
                  <span>2,180</span>
                </div>
                <div className="h-5 rounded-full border-2 border-black bg-gray-100 p-0.5">
                  <div className="h-full w-full rounded-full border-2 border-black bg-orange-400"></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-black">
                  <span>LinkedIn</span>
                  <span>640</span>
                </div>
                <div className="h-5 rounded-full border-2 border-black bg-gray-100 p-0.5">
                  <div className="h-full w-1/2 rounded-full border-2 border-black bg-pink-400"></div>
                </div>
              </div>

            </div>

            {/* AI Insight Box - Cartoon & Simple */}
            <div className="mt-8 rounded-2xl border-4 border-black bg-yellow-300 p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-white font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  🤖
                </span>
                <span className="font-black text-black">
                  AI INSIGHT
                </span>
              </div>

              <p className="text-base font-bold text-black">
                <span className="bg-white px-1 border border-black font-black">Reddit</span> generated 42% higher engagement than X.
              </p>
              
              <p className="mt-1 text-sm font-semibold text-gray-800">
                👉 Recommendation: Focus your next campaign on Reddit.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;