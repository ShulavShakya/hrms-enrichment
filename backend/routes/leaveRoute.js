import express from "express";
const router = express.Router();

import createLeave from "../controller/leaveController.js";

router.post("/", createLeave);

export default router;
