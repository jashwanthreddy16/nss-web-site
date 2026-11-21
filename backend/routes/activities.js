import express from "express";
import mongoose from "mongoose";
import Activity from "../models/Activity.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Helper to find by _id or activityId
const findActivity = async (idParam) => {
  if (mongoose.Types.ObjectId.isValid(idParam)) {
    const act = await Activity.findById(idParam);
    if (act) return act;
  }
  const numericId = Number(idParam);
  if (!isNaN(numericId)) {
    return await Activity.findOne({ activityId: numericId });
  }
  return null;
};

// @desc    Fetch all activities
// @route   GET /api/activities
// @access  Public
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find({}).sort({ activityId: 1, createdAt: 1 });
    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error.message);
    res.status(500).json({ message: "Server error fetching activities" });
  }
});

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const activity = await findActivity(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json(activity);
  } catch (error) {
    console.error("Error fetching single activity:", error.message);
    res.status(500).json({ message: "Server error fetching activity" });
  }
});

// @desc    Create an activity
// @route   POST /api/activities
// @access  Private (Admin only)
router.post("/", protect, async (req, res) => {
  try {
    const { date, title, vertical, hours, objective, impact, images, activityId } = req.body;

    if (!title || !vertical || hours === undefined || !date) {
      return res.status(400).json({ message: "Title, vertical, hours, and date are required" });
    }

    // Auto-generate activityId if not provided
    let newActivityId = activityId;
    if (!newActivityId) {
      const highest = await Activity.findOne({}).sort({ activityId: -1 });
      newActivityId = (highest && highest.activityId ? highest.activityId : 0) + 1;
    }

    const activity = new Activity({
      activityId: newActivityId,
      date,
      title,
      vertical,
      hours: Number(hours),
      objective: objective || "",
      impact: impact || "",
      images: Array.isArray(images) ? images : [],
    });

    const createdActivity = await activity.save();
    res.status(201).json(createdActivity);
  } catch (error) {
    console.error("Error creating activity:", error.message);
    res.status(500).json({ message: "Server error creating activity" });
  }
});

// @desc    Update an activity
// @route   PUT /api/activities/:id
// @access  Private (Admin only)
router.put("/:id", protect, async (req, res) => {
  try {
    const activity = await findActivity(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const { date, title, vertical, hours, objective, impact, images } = req.body;

    if (date !== undefined) activity.date = date;
    if (title !== undefined) activity.title = title;
    if (vertical !== undefined) activity.vertical = vertical;
    if (hours !== undefined) activity.hours = Number(hours);
    if (objective !== undefined) activity.objective = objective;
    if (impact !== undefined) activity.impact = impact;
    if (images !== undefined) activity.images = Array.isArray(images) ? images : [];

    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } catch (error) {
    console.error("Error updating activity:", error.message);
    res.status(500).json({ message: "Server error updating activity" });
  }
});

// @desc    Delete an activity
// @route   DELETE /api/activities/:id
// @access  Private (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const activity = await findActivity(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    await activity.deleteOne();
    res.json({ message: "Activity removed successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting activity:", error.message);
    res.status(500).json({ message: "Server error deleting activity" });
  }
});

export default router;
