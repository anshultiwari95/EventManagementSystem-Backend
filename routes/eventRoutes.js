import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Create event
router.post("/", async (req, res) => {
  const event = new Event(req.body);
  const saved = await event.save();
  res.json(saved);
});

// Get events
router.get("/", async (req, res) => {
  const events = await Event.find().populate("profiles");
  res.json(events);
});

// Update event
// Update event
router.put("/:id", async (req, res) => {
  try {
    const { startTimeUTC, endTimeUTC, profiles } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 🔥 Save previous values
    const previousValues = {
      startTimeUTC: event.startTimeUTC,
      endTimeUTC: event.endTimeUTC,
      profiles: event.profiles,
    };

    // 🔥 Create new values
    const newValues = {
      startTimeUTC,
      endTimeUTC,
      profiles,
    };

    // 🔥 Push log
    event.logs.push({
      previousValues,
      newValues,
      updatedAtUTC: new Date(),
    });

    // 🔥 Update event
    event.startTimeUTC = startTimeUTC;
    event.endTimeUTC = endTimeUTC;
    event.profiles = profiles;

    const updated = await event.save();

    res.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;