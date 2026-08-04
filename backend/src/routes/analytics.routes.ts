import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  getAnalytics,
} from "../controllers/analytics.controller";

const router = Router();

router.get(

  "/campaigns/:id/analytics",

  authenticate,

  getAnalytics

);

export default router;