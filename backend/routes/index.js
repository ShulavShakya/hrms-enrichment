import express from "express";

import employeeRoutes from "./employeeRoutes.js";
import departmentRoutes from "./departmentRoute.js";
import attendanceRoutes from "./attendanceRoute.js";
import leaveRoutes from "./leaveRoute.js";
import payRoutes from "./payrollRoute.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/employees", employeeRoutes);
router.use("/department", departmentRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/leave", leaveRoutes);
router.use("/pay", payRoutes);
router.use("/auth", authRoutes);

export default router;