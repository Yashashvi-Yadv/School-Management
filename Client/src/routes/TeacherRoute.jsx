import { Route } from "react-router-dom";

import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import Tstudentdash from "../pages/Teacher/Student/Tstudentdash";
import Addstudent from "../pages/Teacher/Student/Addstudent";
import Updatestudent from "../pages/Teacher/Student/Updatestudent";
import Deletestudent from "../pages/Teacher/Student/Deletestudent";
import Showstudent from "../pages/Teacher/Student/Showstudent";
import TeacherGrade from "../pages/Teacher/Grade/TeacherGrade";
import ProtectedRoute from "../utils/ProtectedRoute";
import AddGrade from "../pages/Teacher/Grade/AddGrade";
import ViewGrade from "../pages/Teacher/Grade/ViewGrade";
import UpdateGrade from "../pages/Teacher/Grade/UpdateGrade";
import DeleteGrade from "../pages/Teacher/Grade/DeleteGrade";
export const teacherroute = (
  <>
    {" "}
    <Route
      path="/teacherdashboard"
      element={
        <ProtectedRoute>
          {" "}
          <TeacherDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/students"
      element={
        <ProtectedRoute>
          {" "}
          <Tstudentdash />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/students/add"
      element={
        <ProtectedRoute>
          {" "}
          <Addstudent />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/students/update"
      element={
        <ProtectedRoute>
          {" "}
          <Updatestudent />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/students/delete"
      element={
        <ProtectedRoute>
          {" "}
          <Deletestudent />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/students/show"
      element={
        <ProtectedRoute>
          {" "}
          <Showstudent />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/grade"
      element={
        <ProtectedRoute>
          {" "}
          <TeacherGrade />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/grade/add"
      element={
        <ProtectedRoute>
          {" "}
          <AddGrade />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/grade/view"
      element={
        <ProtectedRoute>
          {" "}
          <ViewGrade />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/grade/update"
      element={
        <ProtectedRoute>
          {" "}
          <UpdateGrade />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/grade/delete"
      element={
        <ProtectedRoute>
          {" "}
          <DeleteGrade />
        </ProtectedRoute>
      }
    />
  </>
);
