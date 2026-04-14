import express from "express";
import {
  getUserDetails,
  login,
  logout,
  refreshAccessToken,
  register,
  updateUserProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/refresh", refreshAccessToken);
router.get("/me", authMiddleware, getUserDetails);
router.patch("/me/update", authMiddleware, updateUserProfile);

export default router;
