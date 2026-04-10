import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});
