import {
  FolderPlus,
  Flag,
  Link2,
  MousePointerClick,
  BarChart3,
  Sparkles,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    icon: FolderPlus,
    title: "Create a Project",
    description:
      "Organize every product launch or marketing effort in one place.",
    color: "bg-cyan-300",
  },
  {
    icon: Flag,
    title: "Create Campaigns",
    description:
      "Twitter, Reddit, LinkedIn, Product Hunt, Influencer... every campaign gets its own identity.",
    color: "bg-pink-300",
  },
  {
    icon: Link2,
    title: "Generate Smart Links",
    description:
      "LaunchLens creates a unique tracking link for every campaign.",
    color: "bg-yellow-300",
  },
  {
    icon: MousePointerClick,
    title: "Track Every Click",
    description:
      "Every visitor is logged with country, browser, device, referrer and timestamp.",
    color: "bg-green-300",
  },
  {
    icon: BarChart3,
    title: "Visualize Performance",
    description:
      "Beautiful dashboards compare every campaign side-by-side.",
    color: "bg-indigo-300",
  },
  {
    icon: Sparkles,
    title: "AI Explains Everything",
    description:
      "Instead of only charts, LaunchLens tells you what happened and what to do next.",
    color: "bg-orange-300",
  },
];

const Solution = () => {
  return (
    <section className="bg-cyan-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="rounded-xl border-2 border-black bg-green-300 px-5 py-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            The Solution
          </span>

          <h2 className="mt-8 text-5xl font-black text-black">
            LaunchLens Makes Marketing Crystal Clear.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg font-semibold text-gray-700">
            Every campaign gets its own tracking link,
            every click becomes valuable data,
            and AI turns that data into actionable insights.
          </p>

        </div>

        {/* Timeline */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={index}
                className={`relative rounded-3xl border-4 border-black ${step.color} p-7 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 hover:rotate-1`}
              >

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">

                  <Icon
                    size={30}
                    strokeWidth={2.8}
                  />

                </div>

                <h3 className="text-2xl font-black">

                  {step.title}

                </h3>

                <p className="mt-4 font-semibold leading-7 text-gray-800">

                  {step.description}

                </p>

              </div>

            );

          })}

        </div>

        {/* Bottom Illustration */}

        <div className="mt-20 flex flex-col items-center">

          <ArrowDown
            size={42}
            strokeWidth={3}
            className="animate-bounce"
          />

          <div className="mt-6 rounded-3xl border-4 border-black bg-yellow-300 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

            <h3 className="text-center text-3xl font-black">

              🎉 Finally...

            </h3>

            <p className="mt-5 max-w-2xl text-center text-lg font-bold leading-8">

              Instead of guessing which marketing channel worked,
              you know exactly where your users came from,
              which campaigns deserve more budget,
              and where to focus next.

            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Solution;