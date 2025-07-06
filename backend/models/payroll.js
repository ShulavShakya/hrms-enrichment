import { mongoose } from "mongoose";

const payrollSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
  basicSalary: {
    type: Number,
  },
  totalSalary: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["pending", "paid"],
  },
});

const Payroll = mongoose.model("Payroll", payrollSchema);
export default Payroll;
