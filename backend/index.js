// // const express = require("express"); //for common js
// // const mongoose = require("mongoose"); //for common js

// // import express from "express";

// const app = express();
// const port = 3000;

// app.get("/hello", (req, res) => {
//   res.send("Hello World");
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

import express from "express";
import mongoose from "mongoose";
import Employee from "./models/employee.js";

const app = express();
const port = 3000;

app.use(express.json());

const MONGODB_URI =
  "mongodb+srv://ShulavShakya:dbZenV31x2kRNqYB@hrms.hiq21t9.mongodb.net/?retryWrites=true&w=majority&appName=Hrms";

const dbConnection = mongoose.connect(MONGODB_URI);

dbConnection
  .then(() => {
    console.log("Connected to MongoDB Successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  });

app.post("/employee", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();

    res.status(201).json({
      success: true,
      message: "Employee created succesfully.",
      data: savedEmployee,
    });
  } catch (error) {
    console.log();

    res.status(500).json({
      success: false,
      message: "Error creating employee",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
