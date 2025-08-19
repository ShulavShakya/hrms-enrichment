import jwt from "jsonwebtoken";
import Employee from "../models/employee.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee) {
      return res.status(404).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, String(employee.password));
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { id: employee._id, email: employee.email },
      process.env.KEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
      secure: process.env.NODE_ENV === "production",
    });

    const { password: pass, ...empData } = employee._doc;
    return res.status(200).json({
      status: true,
      message: "Logged in successfully",
      data: token,
      employee: { email, ...empData },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Login unsuccessful",
      error: error.message,
    });
  }
};
