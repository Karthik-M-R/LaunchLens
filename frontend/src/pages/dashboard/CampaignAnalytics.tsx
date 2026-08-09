import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../api/axios";

import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

import AnalyticsHeader from "../../components/dashboard/AnalyticsHeader";
import AnalyticsCards from "../../components/dashboard/AnalyticsCards";
import TimelineChart from "../../components/dashboard/TimelineChart";
import DeviceChart from "../../components/dashboard/DeviceChart";
import AnalyticsBarChart from "../../components/dashboard/AnalyticsBarChart";
import DashboardShell from "../../components/dashboard/DashboardShell";
import AIInsights
from "../../components/dashboard/AIInsights";

const CampaignAnalytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    <DashboardShell
      title="Campaign Analytics"
      subtitle="Turn campaign traffic into actionable insights."
    >
        <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          ← Back to Project
        </Button>

          <AnalyticsHeader
            campaign={analytics.campaign}
          />

          <AnalyticsCards
            summary={analytics.summary}
            devices={analytics.devices}
            
          />
          <AIInsights
  campaignId={id!}
/>

          <TimelineChart
            data={analytics.timeline}
          />

          <div className="grid gap-6 lg:grid-cols-2">

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
    </DashboardShell>
  );
};

export default CampaignAnalytics;