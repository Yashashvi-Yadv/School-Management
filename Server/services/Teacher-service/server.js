import express from "express";
const app = express();
import { configDotenv } from "dotenv";
configDotenv();
import db from "./src/config/connectdb.js";
import cors from "cors";
import teacherroute from "./src/routes/teacher.route.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"], // React dev server (Vite default)
    credentials: true, // allow cookies / auth headers
  })
);
db();

app.get("/", (req, res) => {
  res.send("hello from admin api");
});

app.use("/api/teachers/", teacherroute);

app.listen(8002, () => {
  console.log("admin teacher service is running");
});
