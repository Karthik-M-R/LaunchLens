import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import { getCampaignAnalytics } from "../controllers/analytics.controller";

const router = Router();

router.get(
  "/campaigns/:id/analytics",
  authenticate,
  getCampaignAnalytics
);

export default router;