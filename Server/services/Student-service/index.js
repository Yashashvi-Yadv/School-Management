import express from "express";
const app = express();
import { connectDB } from "db-connect-yash";
import { config } from "dotenv";
import cors from "cors";
import studentroute from "./src/routes/route.js";
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB({
  type: "mongo",
  uri: "mongodb://localhost:27017/school_management",
});
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello from the student api");
});
app.use(studentroute);
app.listen(9001, () => {
  console.log("teacher-student api is working fine");
});
