import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployee,
} from "../controller/employeeController.js";
import { authenticateToken, checkRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", [authenticateToken, checkRoles("admin")], createEmployee);
// router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.delete("/:id", deleteEmployeeById);
router.put("/:id", updateEmployee);

export default router;
