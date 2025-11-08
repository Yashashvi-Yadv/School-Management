import gateway from "fast-gateway";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const server = gateway({
  middlewares: [
    cors({ origin: ["http://localhost:5173"], credentials: true }),
    morgan("dev"),
    (req, res, next) => {
      console.log("Incoming:", req.method, req.originalUrl);
      next();
    },
  ],
  routes: [
    {
      prefix: "/api/auth",
      target: process.env.AUTH_SERVICE || "http://localhost:8001",
      stripPrefix: false,
    },
    {
      prefix: "/api/teachers",
      target: process.env.TEACHER_SERVICE || "http://localhost:8002",
      stripPrefix: false,
    },
    {
      prefix: "/api/teacher/student",
      target: process.env.STUDENT_SERVICE || "http://localhost:9001",
      stripPrefix: false,
    },
    {
      prefix: "/api/teacher/attendence",
      target: process.env.ATTENDANCE_SERVICE || "http://localhost:9002",
      stripPrefix: false,
    },
    {
      prefix: "/api/grade",
      target: process.env.GRADE_SERVICE || "http://localhost:9003",
      stripPrefix: false,
    },
    {
      prefix: "/api/notification",
      target: process.env.NOTIFICATION_SERVICE || "http://localhost:9004",
      stripPrefix: false,
    },
  ],
});

server.start(5000).then(() => {
  console.log("✅ API Gateway running on port 5000");
});
