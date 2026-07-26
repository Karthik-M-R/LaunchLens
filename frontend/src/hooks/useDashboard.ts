import { useEffect, useState } from "react";

import api from "../api/axios";

export interface DashboardData {
  stats: {
    projects: number;
    campaigns: number;
    clicks: number;
  };

  recentProjects: {
    id: string;
    name: string;
    createdAt: string;
  }[];

  recentActivity: {
    id: string;
    message: string;
  }[];
}

export const useDashboard = () => {

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchDashboard = async () => {

    try {

      const response =
        await api.get("/dashboard");

      setDashboard(response.data.data);

      setError(null);

    } catch (err) {

      console.error(err);

      setError("Failed to load dashboard.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchDashboard();

  }, []);

  return {

    dashboard,

    loading,

    error,

    refreshDashboard: fetchDashboard,

  };

};