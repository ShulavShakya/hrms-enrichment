import { mongoose } from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    clockIn: {
      type: Date,
    },
    clockOut: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["present", "absent", "leave"],
    },
  },
  { timestamp: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
