import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/static/Home";
import Login from "./pages/static/Login";
import Signup from "./pages/static/Signup";
import "./index.css";
import { principalroute } from "./routes/PrincipalRoute";
import { teacherroute } from "./routes/TeacherRoute";
import Logout from "./utils/Logout";
import ProtectedRoute from "./utils/ProtectedRoute";
import TeacherLogin from "./pages/static/TeacherLogin";
import { attendenceRoute } from "./routes/AttendenceRoute";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      {principalroute},{teacherroute},{attendenceRoute},
      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
