import express from "express";
const router = express.Router();
import { limiter } from "../utils/limiter.js";
import { login } from "../controller/authController.js";

router.post("/login", limiter, login);

export default router;
