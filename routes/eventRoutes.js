import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

/* =========================
   CREATE EVENT
========================= */
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    const saved = await event.save();

    // populate profiles before returning
    const populated = await Event.findById(saved._id).populate("profiles");

    res.json(populated);
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   GET EVENTS
========================= */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("profiles");
    res.json(events);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   UPDATE EVENT
========================= */
router.put("/:id", async (req, res) => {
  try {
    const { startTimeUTC, endTimeUTC, profiles } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Save previous state
    const previousValues = {
      startTimeUTC: event.startTimeUTC,
      endTimeUTC: event.endTimeUTC,
      profiles: event.profiles,
    };

    // New state
    const newValues = {
      startTimeUTC,
      endTimeUTC,
      profiles,
    };

    // Push log
    event.logs.push({
      previousValues,
      newValues,
      updatedAtUTC: new Date(),
    });

    // Apply update
    event.startTimeUTC = startTimeUTC;
    event.endTimeUTC = endTimeUTC;
    event.profiles = profiles;

    await event.save();

    // 🔥 Important — repopulate before returning
    const populatedEvent = await Event.findById(event._id)
      .populate("profiles");

    res.json(populatedEvent);

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;