import Employee from "../models/employee.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";

export const createEmployee = async (req, res) => {
  try {
    const { password, ...otherFields } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({
      ...otherFields,
      password: hashedPassword,
      profileImage: req.file?.filename, // save uploaded image filename
    });

    const savedEmployee = await employee.save();

    sendEmail(
      employee.email,
      `Welcome to our company`,
      `Hello ${employee.name},
      Welcome to our company. We are glad to have you on board. Your login credentials are as follow: \nEmail: ${employee.email} \nPassword: ${req.body.password}.\n\nThank you,\nAdmin`
    );

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: savedEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({
      success: false,
      message: "Error creating employee",
      error: error.message,
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      status: true,
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

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      res.status(400).json({
        status: false,
        message: "Employee with that id doesnt exist",
      });
    }

    res.status(200).json({
      status: true,
      message: "Employee retrieved successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error retriving employee",
      error: error.message,
    });
  }
};

export const deleteEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      res.status(400).json({
        status: false,
        message: "Employee not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Employee deleted succesfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Employee not deleted",
      error: error.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    delete updates.password;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(400).json({
        status: false,
        message: "Employee with that id not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Data updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Data couldnt be updated",
      error: error.message,
    });
  }
};
