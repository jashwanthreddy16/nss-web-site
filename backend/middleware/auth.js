import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import { memoryStore } from "../store/memoryStore.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "nss_rgukt_super_secret_jwt_key_2026"
      );

      // Check DB if connected
      if (mongoose.connection.readyState === 1) {
        try {
          const dbUser = await User.findById(decoded.id).select("-password");
          if (dbUser) {
            req.user = dbUser;
            return next();
          }
        } catch {
          // Fall through to memory store
        }
      }

      // Fallback to memoryStore
      const fallbackAdmin = memoryStore.getAdminById(decoded.id);
      if (fallbackAdmin) {
        req.user = {
          _id: fallbackAdmin._id,
          name: fallbackAdmin.name,
          email: fallbackAdmin.email,
          role: fallbackAdmin.role,
        };
        return next();
      }

      return res.status(401).json({ message: "Not authorized, user not found" });
    } catch (error) {
      console.error("Auth token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};
