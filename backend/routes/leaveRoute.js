import express from "express";
import {
  getLeaves,
  getLeaveById,
  deleteLeave,
  updateLeaveStatus,
  applyLeave,
} from "../controller/leaveController.js";

const router = express.Router();

router.post("/create", applyLeave);
router.get("/get", getLeaves);
router.get("/:id", getLeaveById);
router.delete("/delete/:id", deleteLeave);
router.put("/:id", updateLeaveStatus);

export default router;
