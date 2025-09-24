import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AttendanceDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Take Attendance",
      path: "/teacher/attendance/take",
      icon: "📝",
      description: "Record attendance for your classes",
      gradient: "from-blue-500 to-blue-300",
    },
    {
      title: "View Attendance",
      path: "/teacher/attendance/view",
      icon: "👁️",
      description: "Check attendance records and statistics",
      gradient: "from-green-500 to-green-300",
    },
    {
      title: "Update Attendance",
      path: "teacher/attendance/update",
      icon: "✏️",
      description: "Modify existing attendance records",
      gradient: "from-yellow-500 to-yellow-300",
    },
    {
      title: "Delete Attendance",
      path: "teacher/attendance/delete",
      icon: "🗑️",
      description: "Remove outdated attendance entries",
      gradient: "from-red-500 to-red-300",
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  // Animation for button
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Attendance Dashboard
          </h1>
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => navigate("/teacherdashboard")}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Back to Teacher Dashboard
          </motion.button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              onClick={() => navigate(card.path)}
              className={`cursor-pointer bg-gradient-to-br ${card.gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-white flex flex-col items-center justify-center text-center`}
            >
              <span className="text-4xl mb-3">{card.icon}</span>
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-sm opacity-90">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
