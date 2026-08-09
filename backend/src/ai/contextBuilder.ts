import { CampaignAnalytics } from "../types/analytics";

export type AnalyticsData = CampaignAnalytics;

export interface AIAnalyticsContext {
  campaignName: string;

  totalClicks: number;
  uniqueVisitors: number;

  trafficSources: {
    name: string;
    clicks: number;
    percentage: number;
  }[];

  devices: {
    name: string;
    clicks: number;
    percentage: number;
  }[];

  browsers: {
    name: string;
    clicks: number;
    percentage: number;
  }[];

  countries: {
    name: string;
    clicks: number;
    percentage: number;
  }[];

  timeline: {
    date: string;
    clicks: number;
  }[];
}

const calculatePercentage = (
  count: number,
  total: number
): number => {
  if (total === 0) {
    return 0;
  }

  return Number(
    ((count / total) * 100).toFixed(2)
  );
};

export const buildAIContext = (
  analytics: AnalyticsData
): AIAnalyticsContext => {

  const totalClicks =
    analytics.summary.totalClicks;

  return {
    campaignName: analytics.campaign.name,

    totalClicks,

    uniqueVisitors:
      analytics.summary.uniqueVisitors,

    trafficSources:
      analytics.referrers.map((item) => ({
        name: item.referrer,
        clicks: item.count,
        percentage: calculatePercentage(
          item.count,
          totalClicks
        ),
      })),

    devices:
      analytics.devices.map((item) => ({
        name: item.device,
        clicks: item.count,
        percentage: calculatePercentage(
          item.count,
          totalClicks
        ),
      })),

    browsers:
      analytics.browsers.map((item) => ({
        name: item.browser,
        clicks: item.count,
        percentage: calculatePercentage(
          item.count,
          totalClicks
        ),
      })),

    countries:
      analytics.countries.map((item) => ({
        name: item.country,
        clicks: item.count,
        percentage: calculatePercentage(
          item.count,
          totalClicks
        ),
      })),

    timeline: analytics.timeline,
  };
};