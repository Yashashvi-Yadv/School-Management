import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import { SendNotificationForm } from "../pages/Teacher/Notification/SendNotificationForm";
import { NotificationDashboard } from "../pages/Teacher/Notification/NotificationDashboard";
import TdeleteNotification from "../pages/Teacher/Notification/TdeleteNotification";
import TviewNotification from "../pages/Teacher/Notification/TviewNotificaton";
export const notificationRoute = (
  <>
    <Route
      path="/teacher/notification/send"
      element={
        <ProtectedRoute>
          <SendNotificationForm />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/notification/view"
      element={
        <ProtectedRoute>
          <TviewNotification />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/notification/delete"
      element={
        <ProtectedRoute>
          <TdeleteNotification />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/notification"
      element={
        <ProtectedRoute>
          <NotificationDashboard />
        </ProtectedRoute>
      }
    />{" "}
  </>
);
