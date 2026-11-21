import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    activityId: {
      type: Number,
      index: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    vertical: {
      type: String,
      required: true,
      trim: true,
    },
    hours: {
      type: Number,
      required: true,
      min: 0,
    },
    objective: {
      type: String,
      default: "",
      trim: true,
    },
    impact: {
      type: String,
      default: "",
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for id mapping to match frontend
activitySchema.virtual("id").get(function () {
  return this.activityId || this._id.toString();
});

activitySchema.set("toJSON", { virtuals: true });
activitySchema.set("toObject", { virtuals: true });

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
