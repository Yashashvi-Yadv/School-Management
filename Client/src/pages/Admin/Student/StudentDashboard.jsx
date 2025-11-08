import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  BookOpen,
  ClipboardList,
  BarChart,
  LogOut,
  UserPlus,
  UserMinus,
  Pencil,
  ClipboardList as ClipboardListIcon,
  BookOpen as BookOpenIcon,
  Eye,
} from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // Default to closed on mobile

  // Update sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(true); // Open sidebar on medium screens and above
      } else {
        setOpen(false); // Close sidebar on mobile
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const user = JSON.parse(
    localStorage.getItem("user") ||
      '{"name": "John Doe", "picture": "https://via.placeholder.com/40"}'
  );

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home size={20} />,
      link: "/principaldashboard",
    },
    {
      name: "Teachers",
      icon: <Users size={20} />,
      link: "/principal/teachers",
    },
    {
      name: "Students",
      icon: <BookOpen size={20} />,
      link: "/principal/students",
    },
    {
      name: "Attendance",
      icon: <ClipboardList size={20} />,
      link: "/principal/attendance",
    },
    {
      name: "Reports",
      icon: <BarChart size={20} />,
      link: "/principal/reports",
    },
  ];

  const features = [
    {
      name: "Add Student",
      icon: <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />,
      path: "/principal/student/add",
      color: "bg-blue-100",
    },
    {
      name: "Update Student",
      icon: <Pencil className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />,
      path: "/principal/student/update",
      color: "bg-green-100",
    },
    {
      name: "Delete Student",
      icon: <UserMinus className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />,
      path: "/principal/student/delete",
      color: "bg-red-100",
    },
    {
      name: "Assign Class",
      icon: (
        <ClipboardListIcon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
      ),
      path: "/principal/student/assignclass",
      color: "bg-purple-100",
    },
    {
      name: "Assign Subject",
      icon: (
        <BookOpenIcon className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" />
      ),
      path: "/principal/student/assignsubject",
      color: "bg-yellow-100",
    },
    {
      name: "Show Student",
      icon: <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" />,
      path: "/principal/student/show",
      color: "bg-green-100",
    },
  ];

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        animate={{ width: open ? 256 : 80, x: open ? 0 : -256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-blue-700 text-white p-2 sm:p-4 fixed h-screen z-20"
      >
        <motion.h1
          animate={{ fontSize: open ? "1.5rem" : "1.25rem" }}
          transition={{ duration: 0.3 }}
          className="font-bold mb-6 sm:mb-8"
        >
          {open ? `${user?.name} Principal` : "P"}
        </motion.h1>
        <ul className="space-y-3 sm:space-y-4">
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center space-x-2 sm:space-x-3 p-2 hover:bg-blue-600 rounded cursor-pointer"
            >
              {item.icon}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.link}
                      className="w-full block text-sm sm:text-base"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: menuItems.length * 0.1, duration: 0.3 }}
            className="flex items-center space-x-2 sm:space-x-3 p-2 hover:bg-blue-600 rounded cursor-pointer mt-6 sm:mt-8"
          >
            <LogOut size={20} />
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/logout"
                    className="w-full block text-sm sm:text-base"
                  >
                    Logout
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        </ul>
      </motion.div>

      {/* Overlay for mobile when sidebar is open */}
      <AnimatePresence>
        {open && window.innerWidth < 768 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-10"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col h-full transition-all duration-300 ${
          open && window.innerWidth >= 768 ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white shadow px-2 sm:px-4 py-3 sticky top-0 z-10 w-full">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className="text-blue-700 font-bold text-lg sm:text-xl"
          >
            ☰
          </motion.button>
          <motion.input
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            type="text"
            placeholder="Search..."
            className="border rounded px-2 sm:px-3 py-1 w-full sm:w-1/2 md:w-1/3 text-sm sm:text-base"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 sm:space-x-3"
          >
            <img
              src={user?.picture}
              alt="profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <span className="font-semibold text-sm sm:text-base hidden sm:block">
              Principal
            </span>
          </motion.div>
        </div>

        {/* Dashboard Content */}
        <motion.div
          className="p-2 sm:p-4 w-full flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Student Management
          </motion.h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 w-full">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                onClick={() => navigate(feature.path)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.4 }}
                className={`cursor-pointer ${feature.color} rounded-xl p-3 sm:p-4 shadow hover:shadow-lg transition h-full flex items-center justify-center`}
              >
                <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                  <motion.div
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h2 className="text-sm sm:text-lg font-semibold text-center">
                    {feature.name}
                  </h2>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
