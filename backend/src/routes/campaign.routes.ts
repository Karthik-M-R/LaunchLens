import { Router } from "express";

import {
  createCampaign,
  getCampaigns,
  updateCampaign,
  deleteCampaign,
} from "../controllers/campaign.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Project Routes
router.get(
  "/projects/:projectId/campaigns",
  getCampaigns
);

router.post(
  "/projects/:projectId/campaigns",
  createCampaign
);

// Campaign Routes
router.patch(
  "/campaigns/:id",
  updateCampaign
);

router.delete(
  "/campaigns/:id",
  deleteCampaign
);

export default router;