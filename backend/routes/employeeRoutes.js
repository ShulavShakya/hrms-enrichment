import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployee,
} from "../controller/employeeController.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.delete("/:id", deleteEmployeeById);
router.put("/:id", updateEmployee);

export default router;
