import {
  Rocket,
  Mail,
  TrendingUp,
  CircleHelp,
  Users,
} from "lucide-react";

// Modern X (formerly Twitter) Logo SVG
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Problem = () => {
  return (
    <section
      id="about"
      className="bg-pink-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="rounded-xl border-2 border-black bg-red-300 px-4 py-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            The Problem
          </span>

          <h2 className="mt-8 text-5xl font-black">
            You Built Something Amazing.
            <br />
            Now What?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold text-gray-700">
            Every founder promotes their product everywhere...
            but ends up with one confusing number.
          </p>
        </div>

        {/* Story */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {/* Left */}
          <div className="rounded-3xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="mb-8 text-2xl font-black">
              You launched everywhere 🚀
            </h3>

            <div className="space-y-4">
              <Item
                icon={<XIcon className="h-5 w-5" />}
                color="bg-cyan-300"
                text="Posted on X"
              />

              <Item
                icon={<TrendingUp />}
                color="bg-orange-300"
                text="Shared on Reddit"
              />

              <Item
                icon={<Linkedin />}
                color="bg-blue-300"
                text="Posted on LinkedIn"
              />

              <Item
                icon={<Rocket />}
                color="bg-green-300"
                text="Launched on Product Hunt"
              />

              <Item
                icon={<Mail />}
                color="bg-yellow-300"
                text="Sent Email Campaign"
              />

              <Item
                icon={<Users />}
                color="bg-purple-300"
                text="Promoted through Influencer"
              />
            </div>
          </div>

          {/* Right */}
          <div className="rounded-3xl border-4 border-black bg-yellow-200 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="rounded-2xl border-4 border-black bg-white p-6">
              <p className="text-center text-lg font-bold">
                After One Week...
              </p>

              <h1 className="mt-4 text-center text-6xl font-black">
                8,000
              </h1>

              <p className="text-center font-bold">
                Visitors 🎉
              </p>
            </div>

            <div className="mt-8 rounded-2xl border-4 border-black bg-red-300 p-6">
              <div className="mb-3 flex items-center gap-2">
                <CircleHelp />
                <span className="font-black">
                  But...
                </span>
              </div>

              <ul className="space-y-3 font-bold">
                <li>❌ Which campaign worked best?</li>
                <li>❌ Which platform converted users?</li>
                <li>❌ Which influencer was worth paying?</li>
                <li>❌ Which campaign wasted money?</li>
                <li>❌ Where should you invest next?</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

type ItemProps = {
  icon: React.ReactNode;
  color: string;
  text: string;
};

function Item({ icon, color, text }: ItemProps) {
  return (
    <div className={`flex items-center gap-4 rounded-2xl border-3 border-black ${color} p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
      {icon}
      <span className="font-black">
        {text}
      </span>
    </div>
  );
}

export default Problem;