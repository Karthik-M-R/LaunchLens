export type Project = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  website?: string;
  totalCampaigns: number;
  totalClicks: number;
  createdAt: string;
};

export const projects: Project[] = [];