import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message: "welcome to the api gateway",
  });
});
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE || "http://localhost:8001",
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "/api/auth" },
  })
);
app.use(
  "/api/teachers",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE || "http://localhost:8002",
    changeOrigin: true,
    pathRewrite: { "^/api/teachers": "/api/teachers" },
  })
);

app.use(
  "/api/teacher/student",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE || "http://localhost:9001",
    changeOrigin: true,
    pathRewrite: { "^/api/teacher/student": "/api/teacher/student" },
  })
);

app.listen(5000, () => {
  console.log("api gateway is running fine");
});
