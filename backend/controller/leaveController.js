import Leave from "../models/leave.js";

export const createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    const savedLeave = await leave.save();
    res.status(201).json({
      status: true,
      message: "Leave created successfully",
      data: savedLeave,
    });
  } catch (error) {
    console.error("Error creating leave:", error);
    res.status(500).json({
      status: false,
      message: "Error creating leave",
      error: error.message,
    });
  }
};

export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("userId", "name email")
      .populate("approvedBy", "name email");

    if (leaves.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No leaves found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Leaves fetched successfully",
      data: leaves,
    });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    res.status(500).json({
      status: false,
      message: "Error fetching leaves",
      error: error.message,
    });
  }
};

export const getLeaveById = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById(id)
      .populate("userId")
      .populate("approvedBy");

    if (!leave) {
      return res.status(404).json({
        status: false,
        message: `Leave for id ${id} not found`,
      });
    }

    res.status(200).json({
      status: true,
      message: "Leave fetched successfully",
      data: leave,
    });
  } catch (error) {
    console.log("Error fetching leave by ID:", error);
    res.status(500).json({
      status: false,
      message: "Error fetching leave by ID",
      error: error.message,
    });
  }
};

export const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) {
      return res.status(400).json({
        status: false,
        message: `No leave found with id ${id}`,
      });
    }
    res.status(200).json({
      status: true,
      message: "Leave deleted successfully",
      data: leave,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error occured while deleting the leave data",
      error: error.message,
    });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { status, approvedBy, rejectionReason } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status,
        approvedBy,
        rejectionReason,
        processedAt: Date.now(),
      },
      { new: true }
    );

    if (!leave) {
      return res.status(400).json({
        status: false,
        message: `Leave with id ${id} not found`,
      });
    }

    res.status(200).json({
      status: true,
      message: "Leave status updated successfully",
      data: leave,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Leave status couldn't be updated",
      error: error.message,
    });
  }
};
