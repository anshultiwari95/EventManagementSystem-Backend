import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// Create profile
router.post("/", async (req, res) => {
  try {
    const normalizedName = req.body.name.trim();

    const existing = await Profile.findOne({
      name: { $regex: new RegExp(`^${normalizedName}$`, "i") },
    });

    if (existing) {
      return res.status(400).json({
        message: "Profile already exists",
      });
    }

    const profile = new Profile({ name: normalizedName });
    const saved = await profile.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all profiles
router.get("/", async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

export default router;