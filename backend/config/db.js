import mongoose from "mongoose";
import dns from "node:dns";

// Fix Windows Node DNS SRV lookup issues with MongoDB Atlas (only on Windows)
if (process.platform === "win32") {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch {
    // Ignore if not permitted
  }
}

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn(
      "⚠️ WARNING: MONGO_URI is not defined in environment variables! Please set MONGO_URI in your Render Dashboard > Environment."
    );
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn(
      "⚠️ Note: Ensure your MongoDB Atlas cluster has 0.0.0.0/0 whitelisted in Network Access so cloud servers can reach it."
    );
  }
};

export default connectDB;
