import express from "express";
import { authenticate } from "../middleware/AuthUser.js";
const app = express.Router();
import {
  get,
  show,
  add,
  remove,
  update,
  attendanceforadmin,
  getforattendence,
  getforgrade,
} from "../controller/student.controller.js";
import { StudentLogin } from "../controller/auth.student.js";
app.post("/get", authenticate, get);
app.post("/login", StudentLogin);
app.get("/show", authenticate, show);
app.post("/add", authenticate, add);
app.post("/delete", authenticate, remove);
app.post("/update", authenticate, update);
app.post("/getforattendence", authenticate, getforattendence);
app.post("/attendanceforadmin", authenticate, attendanceforadmin);
app.post("/getforgrade", authenticate, getforgrade);

export default app;
