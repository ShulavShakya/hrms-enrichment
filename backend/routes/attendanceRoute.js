import express from "express";
import {
  markAttendance,
  getAllAttendance,
  getAttendanceById,
  deleteAttendance,
  updateAttendance,
} from "../controller/attendanceController.js";

const router = express.Router();

router.post("/", markAttendance);
router.get("/", getAllAttendance);
router.get("/:id", getAttendanceById);
router.delete("/:id", deleteAttendance);
router.put("/:id", updateAttendance);

export default router;
