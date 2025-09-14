import express from "express";
const app = express.Router();
import { login, signup, test, teacherlogin, studentlogin } from "../controllers/auth.controller.js"
app.get("/test", test);
app.post("/login",login );

app.post("/signin", signup);
app.post("/teacher/login", teacherlogin);
app.post("/student/login", studentlogin);
export default app;
