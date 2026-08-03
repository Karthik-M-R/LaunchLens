import { Router } from "express";

import { redirectToCampaign } from "../controllers/redirect.controller";

const router = Router();

router.get(
  "/:publicSlug",
  redirectToCampaign
);

export default router;