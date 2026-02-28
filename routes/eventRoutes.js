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
    const { updatedData } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 🔥 Create clean structured log
    event.logs.push({
      previousValues: {
        startTimeUTC: event.startTimeUTC,
        endTimeUTC: event.endTimeUTC,
        profiles: event.profiles,
      },
      newValues: {
        startTimeUTC: updatedData.startTimeUTC,
        endTimeUTC: updatedData.endTimeUTC,
        profiles: updatedData.profiles,
      },
      updatedAtUTC: new Date(),
    });

    // 🔥 Apply updates
    event.startTimeUTC = updatedData.startTimeUTC;
    event.endTimeUTC = updatedData.endTimeUTC;
    event.profiles = updatedData.profiles;

    const updated = await event.save();

    res.json(updated);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;