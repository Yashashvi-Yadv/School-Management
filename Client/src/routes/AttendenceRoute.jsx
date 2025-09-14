import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import AttendenceDash from "../pages/Attendence/AttendenceDash";
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
  </>
);
