import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import config from "../config/config.js";

export const authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw new ApiError(403, "Please login, no token");
  }

  const decoded = jwt.verify(accessToken, config.JWT_SECRET);

  if (!decoded) {
    throw new ApiError(400, "Token expired");
  }

  const user = await User.findOne({ _id: decoded?.userId });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  req.user = user;
  next();
};
