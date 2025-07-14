import express from "express";
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  getDepartmentById,
  updateDepartment,
} from "../controller/departmentController.js";

const router = express.Router();

router.post("/", createDepartment);
router.get("/", getDepartment);
router.get("/:id", getDepartmentById);
router.delete("/:id", deleteDepartment);
router.put("/:id", updateDepartment);

export default router;
