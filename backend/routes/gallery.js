import express from "express";
import mongoose from "mongoose";
import Gallery from "../models/Gallery.js";
import { protect } from "../middleware/auth.js";
import { memoryStore } from "../store/memoryStore.js";

const router = express.Router();

// @desc    Get all gallery photos
// @route   GET /api/gallery
// @access  Public
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const photos = await Gallery.find({}).sort({ createdAt: -1 });
        if (photos && photos.length > 0) {
          return res.json(photos);
        }
      } catch (err) {
        console.warn("DB find gallery failed, using memory fallback:", err.message);
      }
    }
    res.json(memoryStore.getPhotos());
  } catch (error) {
    console.error("Error fetching gallery:", error.message);
    res.json(memoryStore.getPhotos());
  }
});

// @desc    Add a photo to gallery
// @route   POST /api/gallery
// @access  Private (Admin only)
router.post("/", protect, async (req, res) => {
  try {
    const { title, category, imagePath, date, description } = req.body;

    if (!title || !imagePath) {
      return res.status(400).json({ message: "Title and Image Path are required" });
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const photo = new Gallery({
          title: title.trim(),
          category: category ? category.trim() : "General",
          imagePath: imagePath.trim(),
          date: date ? date.trim() : "",
          description: description ? description.trim() : "",
        });

        const savedPhoto = await photo.save();
        return res.status(201).json(savedPhoto);
      } catch (err) {
        console.warn("DB gallery save failed, using memory store:", err.message);
      }
    }

    const savedPhoto = memoryStore.createPhoto({
      title: title.trim(),
      category: category ? category.trim() : "General",
      imagePath: imagePath.trim(),
      date: date ? date.trim() : "",
      description: description ? description.trim() : "",
    });

    res.status(201).json(savedPhoto);
  } catch (error) {
    console.error("Error creating gallery entry:", error.message);
    res.status(500).json({ message: "Server error creating gallery photo" });
  }
});

// @desc    Delete a photo from gallery
// @route   DELETE /api/gallery/:id
// @access  Private (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const photo = await Gallery.findById(req.params.id);
        if (photo) {
          await photo.deleteOne();
          return res.json({ message: "Photo deleted successfully", id: req.params.id });
        }
      } catch (err) {
        console.warn("DB delete photo failed, using memory store:", err.message);
      }
    }

    const deleted = memoryStore.deletePhoto(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Gallery photo not found" });
    }
    res.json({ message: "Photo deleted successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting gallery photo:", error.message);
    res.status(500).json({ message: "Server error deleting gallery photo" });
  }
});

export default router;
