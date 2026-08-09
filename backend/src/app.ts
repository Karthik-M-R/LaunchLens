import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware";
import dashboardRoutes
from "./routes/dashboard.routes";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import campaignRoutes from "./routes/campaign.routes";
import redirectRoutes
from "./routes/redirect.routes";
import analyticsRoutes
from "./routes/analytics.routes";
import aiRoutes
from "./routes/ai.routes";
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "LaunchLens API Running 🚀",
  });
});
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/projects",
  projectRoutes
);
app.use("/api", campaignRoutes);
app.use(
  "/r",
  redirectRoutes
);
app.use(
  "/api",
  analyticsRoutes
);


app.use(
  "/api",
  aiRoutes
);
app.use(errorHandler);
export default app;