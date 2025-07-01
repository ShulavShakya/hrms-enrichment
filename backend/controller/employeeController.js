import Employee from "../models/employee.js";

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
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

export default createEmployee;
