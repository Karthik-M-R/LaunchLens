import prisma from "../config/prisma";

import {
  CampaignAnalytics,
  CampaignInfo,
  SummaryAnalytics,
  DeviceAnalytics,
} from "../types/analytics";

export const getCampaign = async (
  campaignId: string
): Promise<CampaignInfo> => {

  const campaign = await prisma.campaign.findUnique({
    where: {
      id: campaignId,
    },
  });

  if (!campaign) {
    throw new Error("Campaign not found");
  }

  return {
    id: campaign.id,
    name: campaign.name,
    destinationUrl: campaign.destinationUrl,
    trackingLink: `${process.env.APP_URL}/r/${campaign.publicSlug}`,
    createdAt: campaign.createdAt,
  };
};


export const getSummary = async (
  campaignId: string
): Promise<SummaryAnalytics> => {

  const totalClicks =
    await prisma.clickEvent.count({
      where: {
        campaignId,
      },
    });

  const uniqueVisitors =
    await prisma.clickEvent.findMany({
      where: {
        campaignId,
      },
      distinct: ["visitorId"],
      select: {
        visitorId: true,
      },
    });

  const latestClick =
    await prisma.clickEvent.findFirst({
      where: {
        campaignId,
      },
      orderBy: {
        clickedAt: "desc",
      },
      select: {
        clickedAt: true,
      },
    });

  return {

    totalClicks,

    uniqueVisitors:
      uniqueVisitors.length,

    lastClick:
      latestClick?.clickedAt ?? null,

  };

};

export const getDeviceAnalytics = async (
  campaignId: string
): Promise<DeviceAnalytics[]> => {

  const clicks =
    await prisma.clickEvent.findMany({

      where: {
        campaignId,
      },

      select: {
        device: true,
      },

    });

  const deviceMap =
    new Map<string, number>();

  clicks.forEach((click) => {

    deviceMap.set(

      click.device,

      (deviceMap.get(click.device) ?? 0) + 1

    );

  });

  return [...deviceMap.entries()].map(

    ([device, count]) => ({

      device,

      count,

    })

  );

};

import { BrowserAnalytics } from "../types/analytics";

export const getBrowserAnalytics = async (
  campaignId: string
): Promise<BrowserAnalytics[]> => {

  const clicks = await prisma.clickEvent.findMany({
    where: {
      campaignId,
    },
    select: {
      browser: true,
    },
  });

  const browserMap = new Map<string, number>();

  clicks.forEach((click) => {

    const browser =
      click.browser ?? "Unknown";

    browserMap.set(
      browser,
      (browserMap.get(browser) ?? 0) + 1
    );

  });

  return [...browserMap.entries()].map(
    ([browser, count]) => ({
      browser,
      count,
    })
  );
};

import { CountryAnalytics } from "../types/analytics";

export const getCountryAnalytics = async (
  campaignId: string
): Promise<CountryAnalytics[]> => {

  const clicks = await prisma.clickEvent.findMany({
    where: {
      campaignId,
    },
    select: {
      country: true,
    },
  });

  const countryMap = new Map<string, number>();

  clicks.forEach((click) => {

    const country =
      click.country ?? "Unknown";

    countryMap.set(
      country,
      (countryMap.get(country) ?? 0) + 1
    );

  });

  return [...countryMap.entries()].map(
    ([country, count]) => ({
      country,
      count,
    })
  );
};

import { ReferrerAnalytics } from "../types/analytics";

export const getReferrerAnalytics = async (
  campaignId: string
): Promise<ReferrerAnalytics[]> => {

  const clicks = await prisma.clickEvent.findMany({
    where: {
      campaignId,
    },
    select: {
      referrer: true,
    },
  });

  const referrerMap =
    new Map<string, number>();

  clicks.forEach((click) => {

    const referrer =
      click.referrer ?? "Direct";

    referrerMap.set(
      referrer,
      (referrerMap.get(referrer) ?? 0) + 1
    );

  });

  return [...referrerMap.entries()].map(
    ([referrer, count]) => ({
      referrer,
      count,
    })
  );
};

import { TimelineAnalytics } from "../types/analytics";

export const getTimelineAnalytics = async (
  campaignId: string
): Promise<TimelineAnalytics[]> => {

  const clicks = await prisma.clickEvent.findMany({
    where: {
      campaignId,
    },
    orderBy: {
      clickedAt: "asc",
    },
    select: {
      clickedAt: true,
    },
  });

  const timelineMap =
    new Map<string, number>();

  clicks.forEach((click) => {

    const date =
      click.clickedAt
        .toISOString()
        .split("T")[0];

    timelineMap.set(
      date,
      (timelineMap.get(date) ?? 0) + 1
    );

  });

  return [...timelineMap.entries()].map(
    ([date, clicks]) => ({
      date,
      clicks,
    })
  );
};


export const getCampaignAnalytics = async (
  campaignId: string
): Promise<CampaignAnalytics> => {

  const [
    campaign,
    summary,
    timeline,
    devices,
    browsers,
    countries,
    referrers,
  ] = await Promise.all([
    getCampaign(campaignId),
    getSummary(campaignId),
    getTimelineAnalytics(campaignId),
    getDeviceAnalytics(campaignId),
    getBrowserAnalytics(campaignId),
    getCountryAnalytics(campaignId),
    getReferrerAnalytics(campaignId),
  ]);

  return {
    campaign,
    summary,
    timeline,
    devices,
    browsers,
    countries,
    referrers,
  };
};