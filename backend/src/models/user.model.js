import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      match: /^\d{10}$/,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      match:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },

    refreshToken: String,
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (id) {
  return jwt.sign({ userId: id }, config.ACCESS_SECRET, { expiresIn: "1h" });
};

userSchema.methods.generateRefreshToken = function (id) {
  return jwt.sign({ userId: id }, config.REFRESH_SECRET, { expiresIn: "7d" });
};

export const User = mongoose.model("User", userSchema);
