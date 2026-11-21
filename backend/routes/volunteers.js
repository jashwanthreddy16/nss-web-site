import express from "express";
import Volunteer from "../models/Volunteer.js";
import { protect } from "../middleware/auth.js";

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
    const { name, rollNumber, branch, year, phone, email, unit, message } = req.body;

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

    // Check for duplicate roll number or email
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
    });

    const savedVolunteer = await newVolunteer.save();

    res.status(201).json({
      success: true,
      message: "Congratulations! You have successfully registered as an NSS Volunteer.",
      data: savedVolunteer,
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
    const volunteers = await Volunteer.find({}).sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error.message);
    res.status(500).json({ message: "Server error fetching volunteers" });
  }
});

// @desc    Delete a volunteer record
// @route   DELETE /api/volunteers/:id
// @access  Private (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer record not found" });
    }

    await volunteer.deleteOne();
    res.json({ message: "Volunteer registration deleted successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting volunteer:", error.message);
    res.status(500).json({ message: "Server error deleting volunteer" });
  }
});

export default router;
