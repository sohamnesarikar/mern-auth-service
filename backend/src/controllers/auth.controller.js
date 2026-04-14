import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import config from "../config/config.js";

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
