import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function StdAttendanceDash() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "View Attendance",
      path: "/student/attendance/view",
      icon: "👁️",
      description: "Check attendance records and statistics",
      gradient: "from-green-600 to-green-400",
    },
    {
      title: "Update Attendance",
      path: "/student/attendance/update",
      icon: "✏️",
      description: "Modify existing attendance records",
      gradient: "from-yellow-600 to-yellow-400",
    },
    {
      title: "Delete Attendance",
      path: "/student/attendance/delete",
      icon: "🗑️",
      description: "Remove outdated attendance entries",
      gradient: "from-red-600 to-red-400",
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  // Animation for header
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Animation for button
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col p-4 sm:p-6 md:p-8">
      <div className="flex-grow flex flex-col max-w-7xl mx-auto w-full">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row justify-between items-center mb-10 md:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-4 sm:mb-0">
            Attendance Dashboard
          </h1>
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate("/studentdash")}
            className="bg-gradient-to-r from-purple-700 to-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Back to Student Dashboard
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              variants={cardVariants}
              onClick={() => navigate(card.path)}
              className={`cursor-pointer bg-gradient-to-br ${card.gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-white flex flex-col items-center justify-center text-center border border-white/20`}
            >
              <span className="text-5xl mb-4 drop-shadow-md">{card.icon}</span>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 drop-shadow-sm">
                {card.title}
              </h2>
              <p className="text-sm md:text-base opacity-90 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center text-gray-600 text-sm"
        >
          <p>Manage your classroom attendance with ease and efficiency.</p>
          <p className="mt-1">© 2025 Attendance System</p>
        </motion.div>
      </div>
    </div>
  );
}
