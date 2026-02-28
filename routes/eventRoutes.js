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
router.put("/:id", async (req, res) => {
  const { updatedData } = req.body;

  const event = await Event.findById(req.params.id);

  event.logs.push({
    previousValues: {
      startTimeUTC: event.startTimeUTC,
      endTimeUTC: event.endTimeUTC,
    },
    newValues: updatedData,
    updatedAtUTC: new Date(),
  });

  event.startTimeUTC = updatedData.startTimeUTC;
  event.endTimeUTC = updatedData.endTimeUTC;

  event.profiles = updatedData.profiles;

  const updated = await event.save();

  res.json(updated);
});

export default router;