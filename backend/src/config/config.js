import dotenv from "dotenv";

dotenv.config();

const envConfig = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
};

const config = Object.freeze(envConfig);

export default config;
