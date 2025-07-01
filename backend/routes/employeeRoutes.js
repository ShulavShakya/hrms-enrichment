import express from "express";
import createEmployee from "../controller/employeeController.js";

const router = express.Router();

router.post("/", createEmployee);

export default router;
