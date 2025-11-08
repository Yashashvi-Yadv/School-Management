import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TDeleteNotification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get auth token from localStorage
  const getAuthToken = () => localStorage.getItem("authToken");

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const token = getAuthToken();
      if (!token) {
        throw new Error("No auth token found");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_NOTIFICATION}getnotifiy`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Access the notifications array from response.data
      const data = response.data.notifications || [];
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    if (!confirm("Are you sure you want to delete this notification?")) return;
    try {
      const token = getAuthToken();
      if (!token) return;
      await axios.delete(
        `${import.meta.env.VITE_NOTIFICATION}deletenotification/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Refetch to update list
      await fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
      alert("Failed to delete notification");
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Type badge component
  const TypeBadge = ({ type }) => {
    const typeConfig = {
      info: { bg: "bg-blue-100", text: "text-blue-800" },
      warning: { bg: "bg-yellow-100", text: "text-yellow-800" },
      success: { bg: "bg-green-100", text: "text-green-800" },
    };
    const config = typeConfig[type] || typeConfig.info;
    return (
      <span
        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {type.toUpperCase()}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          Loading notifications...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <motion.button
            onClick={() => navigate("/teacherdashboard")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            ← Back to Dashboard
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Delete Notifications
          </h1>
        </div>
      </motion.div>

      {/* Notifications Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {notifications.map((notif) => (
            <motion.div
              key={notif._id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TypeBadge type={notif.type} />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {notif.senderRole} •{" "}
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {notif.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {notif.message}
                </p>
                {notif.recipientRole && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    To: {notif.recipientRole}{" "}
                    {notif.recipientId ? `(ID: ${notif.recipientId})` : "(All)"}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      notif.isRead
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {notif.isRead ? "Read" : "Unread"}
                  </span>
                  <motion.button
                    onClick={() => deleteNotification(notif._id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-none text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-md transition-colors justify-center"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-full text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No notifications to delete.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TDeleteNotification;
