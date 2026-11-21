import express from "express";
import Gallery from "../models/Gallery.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all gallery photos
// @route   GET /api/gallery
// @access  Public
router.get("/", async (req, res) => {
  try {
    const photos = await Gallery.find({}).sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    console.error("Error fetching gallery:", error.message);
    res.status(500).json({ message: "Server error fetching gallery photos" });
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

    const photo = new Gallery({
      title: title.trim(),
      category: category ? category.trim() : "General",
      imagePath: imagePath.trim(),
      date: date ? date.trim() : "",
      description: description ? description.trim() : "",
    });

    const savedPhoto = await photo.save();
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
    const photo = await Gallery.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({ message: "Gallery photo not found" });
    }

    await photo.deleteOne();
    res.json({ message: "Photo deleted successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting gallery photo:", error.message);
    res.status(500).json({ message: "Server error deleting gallery photo" });
  }
});

export default router;
