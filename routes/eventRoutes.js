import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    const saved = await event.save();
    const populated = await Event.findById(saved._id).populate("profiles");

    res.json(populated);
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("profiles");
    res.json(events);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { startTimeUTC, endTimeUTC, profiles } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const previousValues = {
      startTimeUTC: event.startTimeUTC,
      endTimeUTC: event.endTimeUTC,
      profiles: event.profiles,
    };

    const newValues = {
      startTimeUTC,
      endTimeUTC,
      profiles,
    };

    event.logs.push({
      previousValues,
      newValues,
      updatedAtUTC: new Date(),
    });

    event.startTimeUTC = startTimeUTC;
    event.endTimeUTC = endTimeUTC;
    event.profiles = profiles;

    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate("profiles");

    res.json(populatedEvent);

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;