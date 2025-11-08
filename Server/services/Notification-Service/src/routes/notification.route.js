import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  SaveNotification,
  teachernotify,
  deletenotification,
  getnotify,
} from "../controllers/notification.controller.js";
const app = express.Router();

app.post("/teachersend", authenticate, SaveNotification);
app.get("/teachernotify", authenticate, teachernotify);
app.get("/getnotifiy", authenticate, getnotify);
app.delete("/deletenotification/:id", authenticate, deletenotification);
export default app;
