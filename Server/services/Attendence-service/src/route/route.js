import express from "express";
import {
  getAttendence,
  takeAttendence,
  updateAttendance,
  deleteattendence,
} from "../controller/controller.js";
import { getAttendanceForStudent } from "../controller/student.controller.js";
import { authenticate } from "../middleware/authenticateuser.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from attendance api!");
});
router.post("/takeattendence", authenticate, takeAttendence);
router.post("/getattendence", authenticate, getAttendence);
router.put("/update", authenticate, updateAttendance);
router.delete("/delete", authenticate, deleteattendence);
router.post("/getatforstudent", authenticate, getAttendanceForStudent);

export default router;
