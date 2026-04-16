import express from "express";
import {
  getUserDetails,
  login,
  logout,
  refreshAccessToken,
  register,
  resetPassword,
  sendOtp,
  updateAvatar,
  updateUserProfile,
  verifyOtp,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/refresh", refreshAccessToken);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

router.get("/me", authMiddleware, getUserDetails);
router.patch("/me/update", authMiddleware, updateUserProfile);
router.patch(
  "/me/update/avatar",
  authMiddleware,
  upload.single("avatar"),
  updateAvatar,
);

export default router;
