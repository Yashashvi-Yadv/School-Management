import express from "express";
const app = express();
import { config } from "dotenv";
import cors from "cors";
import studentroute from "./src/routes/route.js";
config();
import db from "./src/config/connnect.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello from the student api");
});
app.use(
  "/api/teacher/student/",

  studentroute
);
app.listen(9001, () => {
  console.log("teacher-student api is working fine");
});
