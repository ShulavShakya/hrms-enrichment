import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Employee from "../models/employee.js";

dotenv.config();
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.KEY);

    req.employee = await Employee.findById(decoded.id).select("-password");
    next();
  } catch (Exception) {
    console.log(Exception.message);
    res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
  }
};

const checkRoles = (roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.employee.role)) {
      return res.status(403).json({
        status: false,
        message: "Access denied",
      });
    }
    next();
  };
};

export { authenticateToken, checkRoles };
