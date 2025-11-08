import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import AttendenceDash from "../pages/Teacher/Attendence/AttendenceDash";
import TakeAttendance from "../pages/Teacher/Attendence/TakeAttendence";
import ViewAttendance from "../pages/Teacher/Attendence/ViewAttendence";
import UpdateAttendence from "../pages/Teacher/Attendence/UpdateAttendence";
import DeleteAttendance from "../pages/Teacher/Attendence/DeleteAttendence";
export const attendenceRoute = (
  <>
    <Route
      path="/teacher/attendance"
      element={
        <ProtectedRoute>
          <AttendenceDash />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/attendance/take"
      element={
        <ProtectedRoute>
          <TakeAttendance />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/attendance/update"
      element={
        <ProtectedRoute>
          <UpdateAttendence />
        </ProtectedRoute>
      }
    />

    <Route
      path="/teacher/attendance/view"
      element={
        <ProtectedRoute>
          <ViewAttendance />
        </ProtectedRoute>
      }
    />

    <Route
      path="/teacher/attendance/delete"
      element={
        <ProtectedRoute>
          <DeleteAttendance />
        </ProtectedRoute>
      }
    />
  </>
);
