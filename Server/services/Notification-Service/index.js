// importing modules
import express from "express";
import cors from "cors";
import { connectDB } from "db-connect-yash";
const app = express();
import notificatonRoute from "./src/routes/notification.route.js";
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
  res.status(200).json({
    message: "notification api is working fine",
  });
});
app.use(notificatonRoute);
app.listen(9004, () => {
  console.log("server of notification runs on :: http://localhost:9004");
});
