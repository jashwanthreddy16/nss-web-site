import express from "express";
import mongoose from "mongoose";
import Contact from "../models/Contact.js";
import { protect } from "../middleware/auth.js";
import { memoryStore } from "../store/memoryStore.js";

const router = express.Router();

// @desc    Store new contact message
// @route   POST /api/contact
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Please fill in all required fields (name, email, subject, message)",
      });
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const contact = new Contact({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : "",
          subject: subject.trim(),
          message: message.trim(),
        });

        const savedMessage = await contact.save();
        return res.status(201).json({
          success: true,
          message: "Thank you for reaching out! Your message has been received.",
          data: savedMessage,
        });
      } catch (err) {
        console.warn("DB contact save failed, saving to memory store:", err.message);
      }
    }

    const savedMessage = memoryStore.createContact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "",
      subject: subject.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! Your message has been received.",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error saving contact message:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while saving your message. Please try again.",
    });
  }
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin only)
router.get("/", protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const messages = await Contact.find({}).sort({ createdAt: -1 });
        if (messages) {
          return res.json(messages);
        }
      } catch (err) {
        console.warn("DB contact query failed, using memory store:", err.message);
      }
    }
    res.json(memoryStore.getContacts());
  } catch (error) {
    console.error("Error fetching contact messages:", error.message);
    res.json(memoryStore.getContacts());
  }
});

export default router;
