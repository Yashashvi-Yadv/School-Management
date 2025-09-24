import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import AttendenceDash from "../pages/Attendence/AttendenceDash";
import TakeAttendance from "../pages/Attendence/TakeAttendence";
import ViewAttendance from "../pages/Attendence/ViewAttendence";
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
      path="/teacher/attendance/view"
      element={
        <ProtectedRoute>
          <ViewAttendance />
        </ProtectedRoute>
      }
    />
  </>
);
