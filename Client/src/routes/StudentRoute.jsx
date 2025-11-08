import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import StudentDash from "../pages/Student/StudentDash";
import StdViewAttendance from "../pages/Student/Attendence/StdViewAttendance";
import StdAttendanceDash from "../pages/Student/Attendence/StdAttendanceDash";
import StdViewGrade from "../pages/Student/Grade/StdViewGrade";
export const studentroute = (
  <>
    {" "}
    <Route
      path="/studentdash"
      element={
        <ProtectedRoute>
          <StudentDash />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/attendance"
      element={
        <ProtectedRoute>
          <StdAttendanceDash />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/attendance/view"
      element={
        <ProtectedRoute>
          <StdViewAttendance />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/grade/view"
      element={
        <ProtectedRoute>
          <StdViewGrade />
        </ProtectedRoute>
      }
    />
  </>
);
