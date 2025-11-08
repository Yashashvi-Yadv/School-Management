import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export const NotificationDashboard = () => {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Send Notification",
      description:
        "Create and send new notifications to students or all users.",
      icon: "📢",
      to: "/teacher/notification/send",
      bg: "bg-gradient-to-br from-blue-500 to-blue-600",
      hover: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      title: "View Notifications",
      description:
        "Browse and manage your sent notifications with read status.",
      icon: "📋",
      to: "/teacher/notification/view",
      bg: "bg-gradient-to-br from-green-500 to-green-600",
      hover: "hover:from-green-600 hover:to-green-700",
    },
    {
      title: "Delete Notifications",
      description:
        "Select and permanently delete notifications from the system.",
      icon: "🗑️",
      to: "/teacher/notification/delete",
      bg: "bg-gradient-to-br from-red-500 to-red-600",
      hover: "hover:from-red-600 hover:to-red-700",
    },
  ];

  const handleBack = () => {
    navigate("/teacherdashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        {/* Back Button */}
        <motion.button
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-4 sm:mb-6 inline-flex items-center gap-2 justify-center mx-auto bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 w-full sm:w-auto"
        >
          ← Back to Dashboard
        </motion.button>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Notification Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Access all notification tools with a single click.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group"
          >
            <Link to={card.to}>
              <div
                className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 h-full shadow-lg transition-all duration-300 ${card.bg} ${card.hover} text-white cursor-pointer`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="relative z-10 space-y-4">
                  <div className="text-4xl">{card.icon}</div>
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="text-blue-100 opacity-90">{card.description}</p>
                  <div className="flex items-center justify-end">
                    <span className="text-sm font-medium opacity-80">Go →</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
