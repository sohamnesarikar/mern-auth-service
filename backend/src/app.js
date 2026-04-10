import express from "express";
import cors from "cors";
import config from "./config/config.js";

export const app = express();

app.use(
  cors({
    origin: config.FRONTEND_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
