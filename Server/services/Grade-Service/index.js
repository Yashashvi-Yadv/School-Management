import express from "express";
import cors from "cors";
const app = express();
import { connectDB } from "db-connect-yash";
import gradeRouter from "./src/routes/grade.route.js";
import dotenv from "dotenv";
dotenv.config();
connectDB({
  type: "mongo",
  uri: "mongodb://localhost:27017/school_management",
});
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from grade service!");
});
app.use(gradeRouter);
app.listen(process.env.PORT, () => {
  console.log("Grade service api is running on port http://localhost:9003");
});
