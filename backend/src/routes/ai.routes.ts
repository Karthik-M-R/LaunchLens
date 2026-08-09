import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  generateInsights,
} from "../controllers/ai.controller";


const router = Router();


router.post(
  "/campaigns/:id/insights",
  authenticate,
  generateInsights
);


export default router;