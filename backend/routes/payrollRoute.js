import express from "express";
const router = express.Router();

import { createPayroll } from "../controller/payrollController.js";

router.post("/", createPayroll);

export default router;
