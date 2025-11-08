import { Route } from "react-router-dom";

import PrincipalDashboard from "../pages/Admin/Principal/PrincipalDashboard";
import AdminAttendance from "../pages/Admin/Attendance/AdminAttendance";
import DeleteAttendance from "../pages/Admin/Attendance/DeleteAttendance";
import UpdateAttendance from "../pages/Admin/Attendance/UpdateAttendance";
import ViewAttendance from "../pages/Admin/Attendance/ViewAttendance";
import TeacherDashboard from "../pages/Admin/Teachers/TeacherDashboard";
import ProtectedRoute from "../utils/ProtectedRoute";
import AddTeacher from "../pages/Admin/Teachers/AddTeacher";
import ShowTeacher from "../pages/Admin/Teachers/ShowTeacher";
import UpdateTeacher from "../pages/Admin/Teachers/UpdateTeacher";
import DeleteTeacher from "../pages/Admin/Teachers/DeleteTeacher";
import AssignClass from "../pages/Admin/Teachers/AssignClass";
import AssignSubject from "../pages/Admin/Teachers/AssignSubject";
import StudentDashboard from "../pages/Admin/Student/StudentDashboard";

export const principalroute = (
  <>
    <Route
      path="/principaldashboard"
      element={
        <ProtectedRoute>
          <PrincipalDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/principal/teachers"
      element={
        <ProtectedRoute>
          <TeacherDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/principal/attendance"
      element={
        <ProtectedRoute>
          <AdminAttendance />
        </ProtectedRoute>
      }
    />
    <Route
      path="/principal/attendance/show"
      element={
        <ProtectedRoute>
          <ViewAttendance />
        </ProtectedRoute>
      }
    />
    <Route
      path="/principal/attendance/update"
      element={
        <ProtectedRoute>
          <UpdateAttendance />
        </ProtectedRoute>
      }
    />
    <Route
      path="/principal/attendance/delete"
      element={
        <ProtectedRoute>
          <DeleteAttendance />
        </ProtectedRoute>
      }
    />
    <Route
      path="/principal/teachers/add"
      element={
        <ProtectedRoute>
          <AddTeacher />
        </ProtectedRoute>
      }
    />
    <Route
      path="/principal/teachers/update"
      element={
        <ProtectedRoute>
          <UpdateTeacher />
        </ProtectedRoute>
      }
    />
    <Route
      path="/principal/teachers/delete"
      element={
        <ProtectedRoute>
          <DeleteTeacher />
        </ProtectedRoute>
      }
    />
    <Route
      path="/principal/teachers/assignclass"
      element={
        <ProtectedRoute>
          <AssignClass />
        </ProtectedRoute>
      }
    />
    <Route
      path="/principal/teachers/assignsubject"
      element={
        <ProtectedRoute>
          <AssignSubject />
        </ProtectedRoute>
      }
    />
    <Route
      path="/principal/teachers/show"
      element={
        <ProtectedRoute>
          <ShowTeacher />
        </ProtectedRoute>
      }
    />

    <Route
      path="/principal/students"
      element={
        <ProtectedRoute>
          <StudentDashboard />
        </ProtectedRoute>
      }
    />
  </>
);
