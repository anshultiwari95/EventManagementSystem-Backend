import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// Create profile
router.post("/", async (req, res) => {
  const { name, timezone } = req.body;

  const profile = new Profile({ name, timezone });
  const saved = await profile.save();

  res.json(saved);
});

// Get all profiles
router.get("/", async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

export default router;