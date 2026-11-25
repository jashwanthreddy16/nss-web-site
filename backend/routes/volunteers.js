import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Volunteer from "../models/Volunteer.js";
import { protect } from "../middleware/auth.js";
import { memoryStore } from "../store/memoryStore.js";

const router = express.Router();

// Helper to validate email format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// @desc    Register a new volunteer
// @route   POST /api/volunteers
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, rollNumber, branch, year, phone, email, unit, message, password } = req.body;

    if (!name || !rollNumber || !branch || !year || !phone || !email) {
      return res.status(400).json({
        message: "Please fill in all required fields (Name, Roll Number, Branch, Year, Phone, Email)",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanRollNo = rollNumber.trim().toUpperCase();

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    // Password handling: use provided password or default to rollNumber
    const plainPassword = (password && password.trim()) ? password.trim() : cleanRollNo;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // 1. Try DB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const existingVolunteer = await Volunteer.findOne({
          $or: [{ rollNumber: cleanRollNo }, { email: cleanEmail }],
        });

        if (existingVolunteer) {
          if (existingVolunteer.rollNumber === cleanRollNo) {
            return res.status(400).json({
              message: `Volunteer with roll number ${cleanRollNo} is already registered.`,
            });
          }
          return res.status(400).json({
            message: `Volunteer with email ${cleanEmail} is already registered.`,
          });
        }

        const newVolunteer = new Volunteer({
          name: name.trim(),
          rollNumber: cleanRollNo,
          branch: branch.trim(),
          year: year.trim(),
          phone: phone.trim(),
          email: cleanEmail,
          unit: unit ? unit.trim() : "Any",
          message: message ? message.trim() : "",
          password: hashedPassword,
          serviceHours: 12,
          status: "Active",
        });

        const savedVolunteer = await newVolunteer.save();

        return res.status(201).json({
          success: true,
          message: "Congratulations! You have successfully registered as an NSS Volunteer.",
          data: {
            _id: savedVolunteer._id,
            name: savedVolunteer.name,
            rollNumber: savedVolunteer.rollNumber,
            branch: savedVolunteer.branch,
            year: savedVolunteer.year,
            email: savedVolunteer.email,
            unit: savedVolunteer.unit,
          },
        });
      } catch (err) {
        console.warn("DB volunteer registration failed, saving to memory store:", err.message);
      }
    }

    // 2. Memory store fallback
    const memExisting = memoryStore.findVolunteer({ rollNumber: cleanRollNo, email: cleanEmail });
    if (memExisting) {
      return res.status(400).json({
        message: `Volunteer with roll number ${cleanRollNo} or email ${cleanEmail} is already registered.`,
      });
    }

    const savedVolunteer = memoryStore.createVolunteer({
      name: name.trim(),
      rollNumber: cleanRollNo,
      branch: branch.trim(),
      year: year.trim(),
      phone: phone.trim(),
      email: cleanEmail,
      unit: unit ? unit.trim() : "Any",
      message: message ? message.trim() : "",
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Congratulations! You have successfully registered as an NSS Volunteer.",
      data: {
        _id: savedVolunteer._id,
        name: savedVolunteer.name,
        rollNumber: savedVolunteer.rollNumber,
        branch: savedVolunteer.branch,
        year: savedVolunteer.year,
        email: savedVolunteer.email,
        unit: savedVolunteer.unit,
      },
    });
  } catch (error) {
    console.error("Volunteer registration error:", error.message);
    res.status(500).json({
      message: "Server error occurred during registration. Please try again.",
    });
  }
});

// @desc    Get all registered volunteers
// @route   GET /api/volunteers
// @access  Private (Admin only)
router.get("/", protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const volunteers = await Volunteer.find({}).select("-password").sort({ createdAt: -1 });
        if (volunteers && volunteers.length > 0) {
          return res.json(volunteers);
        }
      } catch (err) {
        console.warn("DB volunteers query failed, using memory store:", err.message);
      }
    }
    res.json(memoryStore.getVolunteers());
  } catch (error) {
    console.error("Error fetching volunteers:", error.message);
    res.json(memoryStore.getVolunteers());
  }
});

// @desc    Delete volunteer
// @route   DELETE /api/volunteers/:id
// @access  Private (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (volunteer) {
          await volunteer.deleteOne();
          return res.json({ message: "Volunteer removed successfully", id: req.params.id });
        }
      } catch (err) {
        console.warn("DB volunteer delete failed, using memory store:", err.message);
      }
    }

    const removed = memoryStore.deleteVolunteer(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.json({ message: "Volunteer removed successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting volunteer:", error.message);
    res.status(500).json({ message: "Server error deleting volunteer" });
  }
});

export default router;
