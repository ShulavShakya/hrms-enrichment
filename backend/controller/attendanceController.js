import Attendance from "../models/attendanceModel.js";

const markAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    const savedAttendance = await attendance.save();

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      data: savedAttendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Attendance couldn't be marked",
      error: error.message,
    });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    if (attendance.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No attendance marked",
      });
    }
    res.status(200).json({
      success: true,
      message: "attendance retrieved successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Attendance couldn't be retrieved",
      error: error.message,
    });
  }
};

const getAttendanceById = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findById({ id });
    if (!attendance) {
      res.status(404).json({
        success: false,
        message: "No attendance has been marked.",
      });
      res.status(200).json({
        success: true,
        message: "Attendance for the following employee retrieved successfully",
        data: attendance,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured while retrieving the attendance data",
      error: error.message,
    });
  }
};

export { markAttendance, getAllAttendance, getAttendanceById };
