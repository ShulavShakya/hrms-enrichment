import { mongoose } from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
