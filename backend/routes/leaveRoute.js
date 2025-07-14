import express from "express";
import { createLeave } from "../controller/leaveController.js";

const router = express.Router();

router.post("/", createLeave);

export default router;
