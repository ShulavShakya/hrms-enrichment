import express from "express";
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  getDepartmentById,
} from "../controller/departmentController.js";

const router = express.Router();

router.post("/", createDepartment);
router.get("/", getDepartment);
router.get("/:id", getDepartmentById);
router.delete("/:id", deleteDepartment);

export default router;
