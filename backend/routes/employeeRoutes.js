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

router.post("/", [authenticateToken, checkRoles(["admin", "manager"])], createEmployee);
router.get("/", [authenticateToken], getEmployees);
router.get("/:id", [authenticateToken], getEmployeeById);
router.delete("/:id", [authenticateToken, checkRoles(["admin", "manager"])], deleteEmployeeById);
router.put("/:id", [authenticateToken, checkRoles(["admin", "manager"])], updateEmployee);

export default router;
