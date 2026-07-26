import { Router } from "express";

import { getDashboard }
from "../controllers/dashboard.controller";

import {
  authenticate,
} from "../middleware/auth.middleware";

const router = Router();

/*
Only logged-in users
can access dashboard.
*/

router.get(
  "/",
  authenticate,
  getDashboard
);

export default router;