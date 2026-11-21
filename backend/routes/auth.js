import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Volunteer from "../models/Volunteer.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const generateToken = (id, role = "admin") => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || "nss_rgukt_super_secret_jwt_key_2026",
    {
      expiresIn: "7d",
    }
  );
};

// ==========================================
// 1. ADMIN AUTHENTICATION
// ==========================================

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "admin",
      token: generateToken(user._id, "admin"),
    });
  } catch (error) {
    console.error("Admin login error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private (Admin)
router.get("/me", protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role || "admin",
  });
});

// ==========================================
// 2. VOLUNTEER AUTHENTICATION
// ==========================================

// @desc    Volunteer Login (by Roll Number or Email)
// @route   POST /api/auth/volunteer/login
// @access  Public
router.post("/volunteer/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Please enter your Roll Number (or Email) and password",
      });
    }

    const cleanInput = identifier.trim();
    const isEmail = cleanInput.includes("@");

    const query = isEmail
      ? { email: cleanInput.toLowerCase() }
      : { rollNumber: cleanInput.toUpperCase() };

    const volunteer = await Volunteer.findOne(query);

    if (!volunteer) {
      return res.status(401).json({
        message: "No registered volunteer found with this Roll Number or Email",
      });
    }

    // Check password
    let isMatch = false;
    if (volunteer.password) {
      isMatch = await bcrypt.compare(password, volunteer.password);
    }
    // Fallback: If unhashed roll number matched
    if (!isMatch && password.toUpperCase() === volunteer.rollNumber.toUpperCase()) {
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password. Default is your Roll Number." });
    }

    const token = generateToken(volunteer._id, "volunteer");

    res.json({
      token,
      user: {
        _id: volunteer._id,
        name: volunteer.name,
        rollNumber: volunteer.rollNumber,
        branch: volunteer.branch,
        year: volunteer.year,
        email: volunteer.email,
        phone: volunteer.phone,
        unit: volunteer.unit,
        serviceHours: volunteer.serviceHours || 12,
        status: volunteer.status || "Active",
        role: "volunteer",
      },
    });
  } catch (error) {
    console.error("Volunteer login error:", error.message);
    res.status(500).json({ message: "Server error during volunteer login" });
  }
});

// @desc    Get Current Logged in Volunteer
// @route   GET /api/auth/volunteer/me
// @access  Private (Volunteer)
router.get("/volunteer/me", async (req, res) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "nss_rgukt_super_secret_jwt_key_2026"
      );

      const volunteer = await Volunteer.findById(decoded.id).select("-password");

      if (!volunteer) {
        return res.status(401).json({ message: "Volunteer not found" });
      }

      return res.json({
        _id: volunteer._id,
        name: volunteer.name,
        rollNumber: volunteer.rollNumber,
        branch: volunteer.branch,
        year: volunteer.year,
        email: volunteer.email,
        phone: volunteer.phone,
        unit: volunteer.unit,
        serviceHours: volunteer.serviceHours || 12,
        status: volunteer.status || "Active",
        role: "volunteer",
        joinedDate: volunteer.createdAt,
      });
    } catch (err) {
      console.error("Volunteer token verify error:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  return res.status(401).json({ message: "Not authorized, token required" });
});

export default router;
