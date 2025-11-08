import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaUserGraduate, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../index.css";

export default function Home() {
  // Animation variants for hero section
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation variants for feature cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.2,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50 font-sans">
      <Header />
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 md:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541339907198-e08756857f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTQ3NzR8MHwxfHNlYXJjaHwxNXx8c2Nob29sJTIwY2FtcHVzfGVufDB8fHx8MTY5MDc3MjE1Nnww&ixlib=rb-4.0.3&q=80&w=1080')",
          }}
        ></div>
        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <motion.h1
            variants={heroVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-indigo-900 leading-tight mb-6 animate-fadeInDown tracking-tight"
          >
            Empower Your School <br /> with Seamless Management 🎓
          </motion.h1>
          <motion.p
            variants={heroVariants}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-10 animate-fadeInUp delay-100 leading-relaxed"
          >
            Streamline student, teacher, and class management with our
            intuitive, modern, and responsive School Management System.
          </motion.p>
          <motion.div
            variants={heroVariants}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center animate-fadeInUp delay-200"
          >
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-8 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Login
              </Link>
            </motion.div>
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Link
                to="/signup"
                className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-indigo-50 hover:border-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Signup
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 relative before:content-[''] before:absolute before:left-1/2 before:-bottom-3 before:h-1.5 before:w-24 before:-translate-x-1/2 before:bg-indigo-500 before:rounded-full animate-fadeIn"
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {/* Student Management Card */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              variants={cardVariants}
            >
              <Link
                to="/student/login"
                className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:border-indigo-200 text-center transform hover:-translate-y-3 animate-slideInUp"
              >
                <div className="bg-indigo-50 rounded-full p-4 inline-block mb-5">
                  <FaUserGraduate className="text-indigo-600 text-4xl sm:text-5xl" />
                </div>
                <h3 className="font-bold text-xl sm:text-2xl mb-3 text-gray-900">
                  Student Management
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Effortlessly add, update, and monitor student records and
                  academic performance.
                </p>
              </Link>
            </motion.div>

            {/* Teacher Management Card */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              variants={cardVariants}
            >
              <Link
                to="/teacher/login"
                className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:border-purple-200 text-center transform hover:-translate-y-3 animate-slideInUp delay-100"
              >
                <div className="bg-purple-50 rounded-full p-4 inline-block mb-5">
                  <FaChalkboardTeacher className="text-purple-600 text-4xl sm:text-5xl" />
                </div>
                <h3 className="font-bold text-xl sm:text-2xl mb-3 text-gray-900">
                  Teacher Management
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Seamlessly manage teacher profiles, subjects, and class
                  assignments.
                </p>
              </Link>
            </motion.div>

            {/* Class Management Card */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              variants={cardVariants}
            >
              <Link
                to="/class/login"
                className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:border-teal-200 text-center transform hover:-translate-y-3 animate-slideInUp delay-200"
              >
                <div className="bg-teal-50 rounded-full p-4 inline-block mb-5">
                  <FaUsers className="text-teal-600 text-4xl sm:text-5xl" />
                </div>
                <h3 className="font-bold text-xl sm:text-2xl mb-3 text-gray-900">
                  Class Management
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Organize classes, sections, and subjects with ease and
                  efficiency.
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
