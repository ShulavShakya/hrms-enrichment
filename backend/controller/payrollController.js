import Payroll from "../models/payroll.js";

export const createPayroll = async (req, res) => {
  try {
    const payroll = new Payroll(req.body);
    const savedPayroll = await payroll.save();

    res.status(201).json({
      status: true,
      message: "Payroll created successfully",
      data: savedPayroll,
    });
  } catch (error) {
    console.log("Error creating payroll:", error);
    res.status(500).json({
      status: false,
      message: "Error creating payroll",
      error: error.message,
    });
  }
};

export const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("userId");
    if (payrolls.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No payrolls found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Payrolls retrieved successfully",
      data: payrolls,
    });
  } catch (error) {
    console.log("Error retrieving payrolls:", error);
    res.status(500).json({
      status: false,
      message: "Error retrieving payrolls",
      error: error.message,
    });
  }
};

export const getPayrollById = async (req, res) => {
  const { id } = req.params;
  try {
    const payroll = await Payroll.findById(id).populate("userId");

    if (!payroll) {
      return res.status(404).json({
        status: false,
        message: `Payroll with id ${id} not found`,
      });
    }
    res.status(200).json({
      status: true,
      message: "Payroll retrieved successfully",
      data: payroll,
    });
  } catch (error) {
    console.log("Error retrieving payroll:", error);
    res.status(500).json({
      status: false,
      message: "Error retrieving payroll",
      error: error.message,
    });
  }
};

export const deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndDelete(req.params.id);
    if (!payroll || payroll.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Payroll data not found",
      });
    }
    res.status(200).json({
      status: true,
      message: `Payroll data with id ${id} successfully deleted.`,
      data: payroll,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Payroll data couldn't be deleted",
      error: error.message,
    });
  }
};

// export const updatePayroll = async (req, res) => {
//   try {
//     // const{status,}
//     const updatedPayroll = await Payroll.findByIdAndUpdate(req.params.id, {});
//   } catch (error) {}
// };
