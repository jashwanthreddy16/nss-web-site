import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import activityRoutes from "./routes/activities.js";
import contactRoutes from "./routes/contact.js";
import volunteerRoutes from "./routes/volunteers.js";
import galleryRoutes from "./routes/gallery.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env config
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// 1. Security HTTP Headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);

// 2. CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5000"],
    credentials: true,
  })
);

// 3. Request Parsers
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// 4. Rate Limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests from this IP, please try again after 15 minutes" },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 login attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts, please try again after 15 minutes" },
});

const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // limit each IP to 30 submissions per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many submissions from this IP, please try again later" },
});

// Apply General Rate Limiter to all API routes
app.use("/api", generalLimiter);

// Specific Rate Limiters
app.use("/api/auth/login", loginLimiter);
app.use("/api/contact", (req, res, next) => {
  if (req.method === "POST") return submissionLimiter(req, res, next);
  next();
});
app.use("/api/volunteers", (req, res, next) => {
  if (req.method === "POST") return submissionLimiter(req, res, next);
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "NSS RGUKT Basar API",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/gallery", galleryRoutes);

// 404 handler for unknown API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Serve Frontend Static Assets in Production
const frontendDist = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDist));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// Global error handler (Never expose sensitive stack/keys in responses)
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err.message);
  res.status(500).json({
    message: "An internal server error occurred. Please try again later.",
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`NSS Backend Server running on port ${PORT}`);
});
