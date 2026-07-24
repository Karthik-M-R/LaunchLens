import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-orange-100 py-24">
      <div className="mx-auto max-w-5xl px-6">

        <div className="rounded-[40px] border-4 border-black bg-white p-12 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">

          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-yellow-300 px-5 py-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">

            <Sparkles size={18} />

            Ready?

          </div>

          <h2 className="mt-8 text-5xl font-black leading-tight">

            Ready to See Which
            <br />

            Campaign Actually Wins?

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold text-gray-700">

            LaunchLens helps you understand every click,
            compare every campaign,
            and make smarter marketing decisions.

          </p>

          <Link
            to="/signup"
            className="mx-auto mt-10 inline-flex items-center gap-3 rounded-2xl border-4 border-black bg-indigo-500 px-8 py-4 text-lg font-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1"
          >
            Create Your First Project

            <ArrowRight />

          </Link>

          <p className="mt-6 font-bold text-gray-500">

            Free to start 

          </p>

        </div>

      </div>
    </section>
  );
};

export default CTA;