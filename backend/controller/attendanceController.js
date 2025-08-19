import Attendance from "../models/attendance.js";

export const markAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    const savedAttendance = await attendance.save();

    res.status(200).json({
      status: true,
      message: "Attendance marked successfully",
      data: savedAttendance,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Attendance couldn't be marked",
      error: error.message,
    });
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    if (attendance.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No attendance marked",
      });
    }
    res.status(200).json({
      status: true,
      message: "attendance retrieved successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Attendance couldn't be retrieved",
      error: error.message,
    });
  }
};

export const getAttendanceById = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findById({ id }).populate("userId");
    if (!attendance) {
      res.status(400).json({
        status: false,
        message: "No attendance has been marked.",
      });
      res.status(200).json({
        status: true,
        message: `Attendance for employee number ${id} retrieved successfully`,
        data: attendance,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error occured while retrieving the attendance data",
      error: error.message,
    });
  }
};

export const deleteAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findByIdAndDelete(id);
    if (!attendance) {
      res.status(401).json({
        status: false,
        message: "Attendance not found",
      });

      res.status(200).json({
        status: true,
        message: "Attendance successfully deleted",
        data: attendance,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Attendance couldn't be deleted",
      error: error.message,
    });
  }
};

export const updateAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAttendance) {
      return res.status(400).json({
        status: false,
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Attendance updated successfully",
      data: updatedAttendance,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Attendance couldn't be updated",
      error: error.message,
    });
  }
};
