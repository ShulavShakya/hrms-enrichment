import jwt from "jsonwebtoken";
import Employee from "../models/employee.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee) {
      res.status(404).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: employee_id, email: employee.email },
      "my-secret-is-my-secret-none-of-your-secret",
      { expiresIn: "1hr" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3000000),
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      status: true,
      message: "Logged in successfully",
      data: token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Login unsuccessful",
      error: error.message,
    });
  }
};

export { login };
