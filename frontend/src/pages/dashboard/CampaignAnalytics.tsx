import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api/axios";

import Loader from "../../components/ui/Loader";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const CampaignAnalytics = () => {

  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [analytics, setAnalytics] =
    useState<any>(null);

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const response =
          await api.get(
            `/campaigns/${id}/analytics`
          );

        setAnalytics(
          response.data.data
        );

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

  return (

    <div className="min-h-screen bg-gray-50 md:flex">

      <Sidebar />

      <main className="flex-1">

        <Topbar
          title="Campaign Analytics"
          subtitle="Performance Overview"
        />

        <div className="mx-auto max-w-7xl p-8">

          <pre className="overflow-auto rounded-xl bg-white p-6 shadow">

            {JSON.stringify(
              analytics,
              null,
              2
            )}

          </pre>

        </div>

      </main>

    </div>

  );

};

export default CampaignAnalytics;