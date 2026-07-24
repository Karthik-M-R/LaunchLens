import {
  FolderPlus,
  Flag,
  Link2,
  Share2,
  MousePointerClick,
  Brain,
  ArrowDown,
} from "lucide-react";

const workflow = [
  {
    icon: FolderPlus,
    title: "Create Project",
    description: "Start by creating a project for your product or startup.",
    color: "bg-cyan-300",
  },
  {
    icon: Flag,
    title: "Create Campaign",
    description: "Create campaigns for Twitter, Reddit, LinkedIn or anywhere.",
    color: "bg-pink-300",
  },
  {
    icon: Link2,
    title: "Generate Smart Link",
    description: "LaunchLens creates a unique tracking URL for every campaign.",
    color: "bg-yellow-300",
  },
  {
    icon: Share2,
    title: "Share Everywhere",
    description: "Post your tracking links across every marketing channel.",
    color: "bg-green-300",
  },
  {
    icon: MousePointerClick,
    title: "Track Every Click",
    description: "Every click is recorded instantly with visitor details.",
    color: "bg-orange-300",
  },
  {
    icon: Brain,
    title: "AI Explains Results",
    description: "Receive campaign comparisons and actionable recommendations.",
    color: "bg-indigo-300",
  },
];

const Workflow = () => {
  return (
    <section
      id="workflow"
      className="bg-indigo-50 py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="rounded-xl border-2 border-black bg-yellow-300 px-5 py-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            Workflow
          </span>

          <h2 className="mt-8 text-5xl font-black">
            From Launch to Insights
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg font-semibold text-gray-700">
            Six simple steps to understand which marketing campaigns
            actually grow your business.
          </p>

        </div>

        {/* Timeline */}

        <div className="mt-24 flex flex-col items-center">

          {workflow.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={index}
                className="flex flex-col items-center"
              >

                <div className={`w-full max-w-xl rounded-3xl border-4 border-black ${step.color} p-7 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]`}>

                  <div className="flex items-center gap-6">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">

                      <Icon
                        size={30}
                        strokeWidth={2.8}
                      />

                    </div>

                    <div>

                      <span className="rounded-lg border-2 border-black bg-white px-3 py-1 text-sm font-black">
                        STEP {index + 1}
                      </span>

                      <h3 className="mt-3 text-2xl font-black">
                        {step.title}
                      </h3>

                      <p className="mt-2 font-semibold text-gray-800">
                        {step.description}
                      </p>

                    </div>

                  </div>

                </div>

                {index !== workflow.length - 1 && (
                  <ArrowDown
                    className="my-6"
                    size={36}
                    strokeWidth={3}
                  />
                )}

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
};

export default Workflow;