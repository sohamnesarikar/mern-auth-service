import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.route.js";

export const app = express();

app.use(
  cors({
    origin: config.FRONTEND_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", userRoutes);

app.use(errorMiddleware);
