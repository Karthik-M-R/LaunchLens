import { Router } from "express";

import { redirectToCampaign } from "../controllers/redirect.controller";

const router = Router();

/*
GET /r/:trackingCode

Example:

/r/reddit-launch
/r/youtube-video
/r/x-marketing
*/

router.get(
  "/:trackingCode",
  redirectToCampaign
);

export default router;