import {
  BarChart3,
  Link2,
  Sparkles,
  Globe2,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Beautiful Analytics Dashboard",
    description:
      "See campaign performance at a glance with interactive charts, comparisons, and real-time metrics.",
    color: "bg-cyan-300",
    side: "left",
  },
  {
    icon: Link2,
    title: "Smart Campaign Links",
    description:
      "Generate a unique short link for every marketing campaign instead of sharing the same URL everywhere.",
    color: "bg-pink-300",
    side: "right",
  },
  {
    icon: Sparkles,
    title: "AI Powered Insights",
    description:
      "Stop staring at charts. LaunchLens explains what happened and recommends where to invest next.",
    color: "bg-yellow-300",
    side: "left",
  },
  {
    icon: Globe2,
    title: "Know Your Audience",
    description:
      "Track visitor country, browser, device, referrer and campaign source automatically.",
    color: "bg-green-300",
    side: "right",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="bg-white py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-xl border-2 border-black bg-purple-300 px-5 py-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">

            Features

          </span>

          <h2 className="mt-8 text-5xl font-black">

            Why Founders Love LaunchLens

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg font-semibold text-gray-700">

            Everything you need to understand your marketing,
            compare campaigns,
            and make smarter growth decisions.

          </p>

        </div>

        <div className="mt-24 space-y-20">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={index}
                className={`flex flex-col items-center gap-10 lg:flex-row ${
                  feature.side === "right"
                    ? "lg:flex-row-reverse"
                    : ""
                }`}
              >

                {/* Text */}

                <div className="flex-1">

                  <div
                    className={`inline-flex rounded-2xl border-4 border-black ${feature.color} p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]`}
                  >

                    <Icon
                      size={34}
                    />

                  </div>

                  <h3 className="mt-8 text-4xl font-black">

                    {feature.title}

                  </h3>

                  <p className="mt-5 max-w-lg text-lg font-semibold leading-8 text-gray-700">

                    {feature.description}

                  </p>

                  <button className="mt-8 flex items-center gap-2 rounded-2xl border-4 border-black bg-indigo-400 px-6 py-3 font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1">

                    Learn More

                    <ArrowRight size={20} />

                  </button>

                </div>

                {/* Illustration */}

                <div className="flex-1">

                  <div className={`rounded-[32px] border-4 border-black ${feature.color} p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>

                    <div className="rounded-3xl border-4 border-black bg-white p-6">

                      <div className="mb-5 h-5 w-28 rounded-full bg-gray-300"></div>

                      <div className="space-y-4">

                        <div className="h-5 rounded-full bg-gray-200"></div>

                        <div className="h-5 w-3/4 rounded-full bg-gray-200"></div>

                        <div className="h-5 w-1/2 rounded-full bg-gray-200"></div>

                      </div>

                      <div className="mt-8 rounded-2xl border-2 border-black bg-yellow-200 p-5">

                        <div className="text-xl font-black">

                          Demo Preview

                        </div>

                        <p className="mt-2 font-semibold">

                          This section will later become an actual
                          dashboard preview.

                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
};

export default Features;