import Employee from "../models/employee.js";
import bcrypt from "bcryptjs";

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const hashedPassword = await bcrypt.hash(employee.password, 10);
    employee.password = hashedPassword;
    const savedEmployee = await employee.save();

    res.status(201).json({
      success: true,
      message: "Employee created succesfully.",
      data: savedEmployee,
    });
  } catch (error) {
    console.log("Error creating employee.");
    res.status(500).json({
      success: false,
      message: "Error creating employee",
      error: error.message,
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      message: "Employee retrieved successfully.",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error getting employees",
      error: error.message,
    });
  }
};

const updateEmployees = async (req, res) => {
  try {
    const employees = await Employee.update();
    
  } catch (error) {}
};

export { createEmployee, getEmployees };
