import mongoose from "mongoose";

const RoutineSchema = new mongoose.Schema({
   title: {
     type: String,
     required: true,
     trim: true,
   },
   image: {
      type: String,
      trim: true,
   },
   createdAt: {
     type: Date,
     default: Date.now,
   },
 })

export default mongoose.model('Routine', RoutineSchema);