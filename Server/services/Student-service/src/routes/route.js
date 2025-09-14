import express from "express";
import { authenticate } from "../middleware/AuthUser.js";
const app = express.Router();
import {
  get,
  show,
  add,
  remove,
  update,
  getforattendence,
} from "../controller/student.controller.js";
app.post("/get", authenticate, get);
app.get("/show", authenticate, show);
app.post("/add", authenticate, add);
app.post("/delete", authenticate, remove);
app.post("/update", authenticate, update);
app.post("/getforattendence", authenticate, getforattendence);

export default app;
