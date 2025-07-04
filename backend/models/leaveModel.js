import { mongoose } from "mongoose";

const leaveSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  type: {
    type: String,
    enum: ["sick", "casual", "earned"],
    required: true,
  },
  dateFrom: {
    type: Date,
    required: true,
  },
  dateTo: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    require: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
  },
});

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
