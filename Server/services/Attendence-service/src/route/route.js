import express from "express";
import { getAttendence, takeAttendence } from "../controller/controller.js";
import { authenticate } from "../middleware/authenticateuser.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from attendance api!");
});
router.post("/takeattendence", authenticate, takeAttendence);
router.post("/getattendence", authenticate, getAttendence);

export default router;
