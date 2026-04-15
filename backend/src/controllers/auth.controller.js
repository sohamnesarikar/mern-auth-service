import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import config from "../config/config.js";
import { getOtpEmailTemplate } from "../utils/getOtpEmailTemplate.js";
import { sendMail } from "../utils/mail.js";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    throw new ApiError(400, "Please fill all required fields");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({ name, email, mobile, password });

  res.status(201).json({
    success: true,
    message: "User Registered successfully",
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please fill all required fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid email or password");
  }

  const accessToken = user.generateAccessToken(user._id);
  const refreshToken = user.generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 1, // 1 hour
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  res.status(200).json({
    success: true,
    message: "Logged in successfuly",
  });
});

export const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh Token missing");
  }

  const decoded = jwt.verify(refreshToken, config.REFRESH_SECRET);

  const user = await User.findById(decoded.userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Invalid or expired Refresh Token");
  }

  const newAccessToken = user.generateAccessToken(user._id);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 1, // 1 hour
  });

  res.status(200).json({ success: true, message: "Access token refreshed" });
});

export const logout = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    await User.findOneAndUpdate(
      { refreshToken },
      { $unset: { refreshToken: 1 } },
    );
  }

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfuly",
  });
});

export const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({ success: true, user });
});

export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { name, email, mobile } = req.body;

  if (!name || !email || !mobile) {
    throw new ApiError(400, "Please fill all required fields");
  }

  const newData = { name, email, mobile };

  const user = await User.findOneAndUpdate(
    { email },
    { $set: newData },
    { returnDocument: "after" },
  ).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const sendOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = Date.now() + 1000 * 60 * 5;

  user.resetPasswordOtp = otp;
  user.resetPasswordOtpExpiry = otpExpiry;
  await user.save();

  const html = getOtpEmailTemplate(otp);

  await sendMail(user.email, "Reset Password", html);

  res.status(200).json({ success: true, message: "otp sent to email" });
});

export const verifyOtp = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (
    !user ||
    otp !== user.resetPasswordOtp ||
    Date.now() > user.resetPasswordOtpExpiry
  ) {
    throw new ApiError(400, "Otp is invalid or expired");
  }

  user.isOtpVerified = true;
  user.resetPasswordOtp = null;
  user.resetPasswordOtpExpiry = null;

  await user.save();

  res.status(200).json({ success: true, message: "otp verify successfully" });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword, confirmPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  if (!user.isOtpVerified) {
    throw new ApiError(400, "otp verification required");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "password do not match");
  }

  user.password = newPassword;
  user.isOtpVerified = false;

  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
});
