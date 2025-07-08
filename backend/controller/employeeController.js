import Employee from "../models/employee.js";
import bcrypt from "bcryptjs";

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const hashedPassword = await bcrypt.hash(employee.password, 10);
    employee.password = hashedPassword;
    const savedEmployee = await employee.save();

    res.status(201).json({
      status: true,
      message: "Employee created succesfully.",
      data: savedEmployee,
    });
  } catch (error) {
    console.log("Error creating employee:", error);
    res.status(500).json({
      status: false,
      message: "Error creating employee",
      error: error.message,
    });
  }
};

const getEmployees = async (req, res) => {
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

const getEmployeeById = async (req, res) => {
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

const deleteEmployeeById = async (req, res) => {
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

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      res.status(400).json({
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

export {
  createEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployee,
};
