import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    profiles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
    eventTimezone: {
      type: String,
      required: true,
    },
    startTimeUTC: {
      type: Date,
      required: true,
    },
    endTimeUTC: {
      type: Date,
      required: true,
    },
    logs: [
      {
        previousValues: {
          startTimeUTC: Date,
          endTimeUTC: Date,
          profiles: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Profile",
            },
          ],
        },
        newValues: {
          startTimeUTC: Date,
          endTimeUTC: Date,
          profiles: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Profile",
            },
          ],
        },
        updatedAtUTC: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Event", eventSchema);
