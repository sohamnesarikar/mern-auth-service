import mongoose from "mongoose";
import config from "./config.js";

const connectToDB = async () => {
  try {
    const dbConnection = await mongoose.connect(config.MONGO_URI);
    console.log(
      `Database connected successfully with host: ${dbConnection.connection.host}`,
    );
  } catch (error) {
    console.log(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectToDB;
