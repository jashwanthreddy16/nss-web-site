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

// Disable buffering so unhandled DB calls fail fast instead of hanging 10 seconds
mongoose.set("bufferCommands", false);

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn(
      "⚠️ WARNING: MONGO_URI is not defined! Running with built-in in-memory fallback store."
    );
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500, // fast failover to memory store
    });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Atlas could not be reached: ${error.message}`);
    console.log("ℹ️  Running with high-performance in-memory fallback store (all demo data, logins & activities available).");
  }
};

export default connectDB;
