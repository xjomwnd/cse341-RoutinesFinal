import mongoose from "mongoose";
import Event from "./Event.mjs";

const TimerSchema = new mongoose.Schema({
   title: {
     type: String,
     required: true,
     trim: true,
   },
   start: {
      type: Date,
   },
   end: {
      type: Date,
   },
   frequency: {
      type: Number,
   },
   eventId: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
   },
   createdAt: {
     type: Date,
     default: Date.now,
   },
 })

export default mongoose.model('Timer', TimerSchema);