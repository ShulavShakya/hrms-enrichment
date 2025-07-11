import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import Employee from "./models/employee.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

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

const seedAdmin = async () => {
  try {
    const admin = await Employee.findOne({ email: "admin@gmail.com" });
    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      await Employee.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
seedAdmin();

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
