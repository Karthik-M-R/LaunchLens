import { Router } from "express";
import { loginLimiter } from "../middleware/loginLimiter";

import {
  signup,
  login,
  me,
  logout,
} from "../controllers/auth.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);

router.post("/login", loginLimiter,login);

router.get("/me", authenticate, me);

router.post("/logout", authenticate, logout);

export default router;