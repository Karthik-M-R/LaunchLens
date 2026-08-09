import { useState } from "react";

import api from "../../api/axios";

interface Insight {
  type:
    | "traffic"
    | "source"
    | "device"
    | "browser"
    | "country"
    | "trend"
    | "data_quality";

  title: string;
  description: string;
  evidence: string;
}

interface Recommendation {
  priority: "high" | "medium" | "low";
  title: string;
  action: string;
}

interface AIInsightResponse {
  summary: string;
  insights: Insight[];
  recommendations: Recommendation[];
}

interface Props {
  campaignId: string;
}

const AIInsights = ({ campaignId }: Props) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] =
    useState<AIInsightResponse | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const generateInsights = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post(
        `/campaigns/${campaignId}/insights`
      );

      setData(response.data.data);

    } catch (error) {
      console.error(
        "Failed to generate AI insights:",
        error
      );

      setError(
        "Unable to generate AI insights. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  const priorityClasses = {
    high: "border-red-200 bg-red-50",
    medium: "border-yellow-200 bg-yellow-50",
    low: "border-green-200 bg-green-50",
  };

  const priorityLabels = {
    high: "HIGH",
    medium: "MEDIUM",
    low: "LOW",
  };

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <span className="text-xl">
              ✨
            </span>

            <h2 className="text-xl font-bold text-gray-900">
              AI Campaign Insights
            </h2>

          </div>

          <p className="mt-1 text-sm text-gray-500">
            Get AI-powered insights based on your
            campaign analytics.
          </p>

        </div>


        <button
          onClick={generateInsights}
          disabled={loading}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {loading
            ? "Analyzing..."
            : data
              ? "Regenerate Insights"
              : "Generate Insights"}

        </button>

      </div>


      {/* Error */}

      {error && (

        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>

      )}


      {/* Loading */}

      {loading && (

        <div className="mt-8 flex flex-col items-center justify-center py-10">

          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

          <p className="mt-4 text-sm text-gray-500">
            Analyzing campaign performance...
          </p>

        </div>

      )}


      {/* Results */}

      {!loading && data && (

        <div className="mt-8 space-y-8">

          {/* Summary */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Summary
            </h3>

            <p className="mt-3 leading-7 text-gray-700">
              {data.summary}
            </p>

          </div>


          {/* Insights */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Key Insights
            </h3>


            <div className="mt-4 grid gap-4 md:grid-cols-2">

              {data.insights.map(
                (insight, index) => (

                  <div
                    key={`${insight.title}-${index}`}
                    className="rounded-xl border border-gray-200 p-5"
                  >

                    <h4 className="font-semibold text-gray-900">
                      {insight.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {insight.description}
                    </p>

                    <div className="mt-4 rounded-lg bg-gray-50 p-3">

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Evidence
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-600">
                        {insight.evidence}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>


          {/* Recommendations */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Recommendations
            </h3>


            <div className="mt-4 space-y-3">

              {data.recommendations.map(
                (recommendation, index) => (

                  <div
                    key={`${recommendation.title}-${index}`}
                    className={`rounded-xl border p-5 ${
                      priorityClasses[
                        recommendation.priority
                      ]
                    }`}
                  >

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold">
                        {
                          priorityLabels[
                            recommendation.priority
                          ]
                        }
                      </span>

                      <h4 className="font-semibold text-gray-900">
                        {recommendation.title}
                      </h4>

                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-700">
                      {recommendation.action}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}


      {/* Empty state */}

      {!loading && !data && !error && (

        <div className="mt-8 rounded-xl border border-dashed border-gray-300 py-10 text-center">

          <div className="text-3xl">
            ✨
          </div>

          <p className="mt-3 font-medium text-gray-800">
            Ready to analyze your campaign
          </p>

          <p className="mt-1 text-sm text-gray-500">
            LaunchLens will analyze your existing
            campaign analytics and generate grounded
            insights.
          </p>

        </div>

      )}

    </section>
  );
};

export default AIInsights;