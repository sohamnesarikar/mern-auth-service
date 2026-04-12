import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import config from "../config/config.js";

export const authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw new ApiError(401, "Please login, no token");
  }

  const decoded = jwt.verify(accessToken, config.JWT_SECRET);

  if (!decoded) {
    throw new ApiError(400, "Token expired");
  }

  req.userId = decoded?.userId;
  next();
};
