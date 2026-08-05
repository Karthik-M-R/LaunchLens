import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api/axios";

import Loader from "../../components/ui/Loader";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import AnalyticsHeader from "../../components/dashboard/AnalyticsHeader";
import AnalyticsCards from "../../components/dashboard/AnalyticsCards";
import TimelineChart from "../../components/dashboard/TimelineChart";
import DeviceChart from "../../components/dashboard/DeviceChart";
import AnalyticsBarChart from "../../components/dashboard/AnalyticsBarChart";

const CampaignAnalytics = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] =
    useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get(
          `/campaigns/${id}/analytics`
        );

        setAnalytics(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!analytics) {
    return (
      <div className="flex h-screen items-center justify-center">
        Failed to load analytics.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <Sidebar />

      <main className="flex-1">
        <Topbar
          title="Campaign Analytics"
          subtitle="Performance Overview"
        />

        <div className="mx-auto max-w-7xl space-y-8 p-8">

          <AnalyticsHeader
            campaign={analytics.campaign}
          />

          <AnalyticsCards
            summary={analytics.summary}
            devices={analytics.devices}
            countries={analytics.countries}
          />

          <TimelineChart
            data={analytics.timeline}
          />

          <div className="grid gap-8 lg:grid-cols-2">

            <DeviceChart
              data={analytics.devices}
            />

            <AnalyticsBarChart
              title="Top Referrers"
              data={analytics.referrers}
              xKey="referrer"
            />

            <AnalyticsBarChart
              title="Browsers"
              data={analytics.browsers}
              xKey="browser"
            />

            <AnalyticsBarChart
              title="Countries"
              data={analytics.countries}
              xKey="country"
            />

          </div>

        </div>
      </main>
    </div>
  );
};

export default CampaignAnalytics;