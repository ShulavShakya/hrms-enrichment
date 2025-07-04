import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const MONGODB_URL = process.env.MONGODB_URI;

const dbConnection = mongoose.connect(MONGODB_URL);

dbConnection
  .then(() => {
    console.log("Connected to MongoDB Successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  });

import emp from "./routes/employeeRoutes.js";
app.use("/api/employees", emp);

import dep from "./routes/departmentRoute.js";
app.use("/api/department", dep);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
