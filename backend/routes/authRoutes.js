import express from "express";
const router = express.Router();
import { limiter } from "../middleware/limitMiddleware.js";
import { login } from "../controller/authController.js";

router.post("/login", limiter, login);

export default router;
