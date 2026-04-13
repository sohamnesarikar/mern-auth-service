import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import config from "../config/config.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(403).json({
        success: false,
        message: "Access token missing",
      });
    }

    const decoded = jwt.verify(accessToken, config.ACCESS_SECRET);

    req.userId = decoded?.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid access token",
    });
  }
};
