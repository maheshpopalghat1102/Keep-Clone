import mongoose from "mongoose";

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
    process.exit(1); // Exit process with failure
  }
};

/**
 * Graceful shutdown
 */
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔒 MongoDB connection closed due to app termination");
  process.exit(0);
});

export default connectDB;
