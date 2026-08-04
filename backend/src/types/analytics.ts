export interface CampaignInfo {
  id: string;
  name: string;
  destinationUrl: string;
  trackingLink: string;
  createdAt: Date;
}

export interface SummaryAnalytics {
  totalClicks: number;
  uniqueVisitors: number;
  lastClick: Date | null;
}

export interface TimelineAnalytics {
  date: string;
  clicks: number;
}

export interface DeviceAnalytics {
  device: string;
  count: number;
}

export interface BrowserAnalytics {
  browser: string;
  count: number;
}

export interface CountryAnalytics {
  country: string;
  count: number;
}

export interface ReferrerAnalytics {
  referrer: string;
  count: number;
}

export interface CampaignAnalytics {
  campaign: CampaignInfo;

  summary: SummaryAnalytics;

  timeline: TimelineAnalytics[];

  devices: DeviceAnalytics[];

  browsers: BrowserAnalytics[];

  countries: CountryAnalytics[];

  referrers: ReferrerAnalytics[];
}