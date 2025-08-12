import Department from "../models/department.js";

export const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    const savedDepartment = await department.save();

    res.status(200).json({
      status: true,
      message: "Department created successfully",
      data: savedDepartment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,
      message: "Department couldnt be created",
    });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const department = await Department.find();
    if (department.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No deparments found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Deparment retrieved successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Department couldnot be retrieved",
      error: error.message,
    });
  }
};

export const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id);

    if (!department) {
      res.status(404).json({
        status: false,
        message: "The specific department not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Department retrieved successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Department not found",
      error: error.message,
    });
  }
};

export const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      res.status(404).json({
        status: false,
        message: "Department not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Department deleted successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Department could not be deleted",
      error: error.message,
    });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDepartment) {
      return res.status(400).json({
        status: false,
        message: "Department not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Department updated successfully",
      data: updatedDepartment,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Department couldn't be updated.",
      error: error.message,
    });
  }
};
