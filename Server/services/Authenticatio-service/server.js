import express from "express";
const app = express();
import { configDotenv } from "dotenv";
configDotenv();
import { connectDB } from "db-connect-yash";
import cors from "cors";
import authroute from "./src/routes/auth.route.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB({
  type: "mongo",
  uri: "mongodb://localhost:27017/school_management",
});
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"], // React dev server (Vite default)
    credentials: true, // allow cookies / auth headers
  })
);

app.get("/", (req, res) => {
  res.send("hello from authentication api");
});

app.use(authroute);

app.listen(8001, () => {
  console.log("port is running");
});
