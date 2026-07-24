import {
  Rocket,
  Mail,
  TrendingUp,
  CircleHelp,
} from "lucide-react";

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
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

            <div className="space-y-5">

              <Item
                icon={<Twitter />}
                color="bg-cyan-300"
                text="Posted on X (Twitter)"
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