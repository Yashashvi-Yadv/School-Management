import express from "express";
const router = express.Router();
import { authenticate } from "../middlewares/grade.middleware.js";
import {
  addgrade,
  deleteGrade,
  getgrade,
  updateGrade,
} from "../controller/grade.controller.js";
router.get("/test", (req, res) => {
  res.send("this is a test route for api grade in router folder");
});

router.post("/add", authenticate, addgrade);
router.post("/get", authenticate, getgrade);
router.put("/update", authenticate, updateGrade);
router.delete("/delete", authenticate, deleteGrade);
export default router;
