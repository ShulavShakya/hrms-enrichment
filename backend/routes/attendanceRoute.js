import express from "express";
import {
  markAttendance,
  getAllAttendance,
  getAttendanceById,
} from "../controller/attendanceController.js";

const router = express.Router();

router.post("/", markAttendance);
router.get("/", getAllAttendance);
router.get("/:id", getAttendanceById);

export default router;
