import express from "express";
import cors from "cors";
const app = express();
import attendenceroute from "./src/route/route.js";
import db from "./src/config/db.js";
db();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/teacher/attendence", attendenceroute);
app.get("/", (req, res) => {
  res.send("Hello from attendence api!");
});

app.listen(9002, () => {
  console.log("Server is running on port 9002");
});
