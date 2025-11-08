import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function TakeAttendance() {
  const token = localStorage.getItem("authToken");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch students from backend dynamically
  useEffect(() => {
    async function getStudents() {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_STUDENT}/getforattendence`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setStudents(res.data.student);
          setAttendance(
            res.data.student.map((s) => ({
              studentId: s._id,
              status: "present",
            }))
          );
        } else {
          setError(res.data.message || "No students found");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching students");
      }
    }

    getStudents();
  }, [token]);

  // Change status of a student
  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) =>
      prev.map((record) =>
        record.studentId === studentId ? { ...record, status } : record
      )
    );
  };

  // Submit attendance
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        date,
        attendance,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_ATTENDENCE}/takeattendence`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || "Attendance submitted successfully");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error submitting attendance");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for radio buttons
  const radioVariants = {
    checked: {
      scale: 1.1,
      backgroundColor: "#3B82F6",
      transition: { duration: 0.2 },
    },
    unchecked: {
      scale: 1,
      backgroundColor: "#D1D5DB",
      transition: { duration: 0.2 },
    },
    hover: {
      scale: 1.15,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
        >
          Take Attendance
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-blue-700 mb-4 sm:mb-6"
        >
          <Link to="/teacher/attendance">Back</Link>
        </motion.h1>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="mb-4 sm:mb-6 p-3 bg-red-100 text-red-700 rounded-lg shadow-md text-sm sm:text-base"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-md border border-gray-200"
        >
          {/* Date Picker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 sm:mb-6"
          >
            <label className="block font-medium mb-1 text-sm sm:text-base">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
              required
            />
          </motion.div>

          {/* Students List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-4 sm:mb-6"
          >
            <h2 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 text-gray-800">
              Students
            </h2>
            {students.length === 0 ? (
              <p className="text-sm sm:text-base text-gray-600">
                No students found.
              </p>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {students.map((student, index) => {
                  const currentStatus =
                    attendance.find((a) => a.studentId === student._id)
                      ?.status || "present";

                  return (
                    <motion.div
                      key={student._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 sm:p-3 bg-gray-100/80 rounded-lg"
                    >
                      <p className="text-sm sm:text-base text-gray-800 mb-2 sm:mb-0">
                        {student.name} (Roll: {student.rollNo}, Class:{" "}
                        {student.className})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["present", "absent", "late"].map((status) => (
                          <motion.label
                            key={status}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-1 sm:space-x-2 cursor-pointer"
                          >
                            <motion.input
                              type="radio"
                              checked={currentStatus === status}
                              onChange={() =>
                                handleStatusChange(student._id, status)
                              }
                              className="hidden"
                            />
                            <motion.span
                              variants={radioVariants}
                              animate={
                                currentStatus === status
                                  ? "checked"
                                  : "unchecked"
                              }
                              whileHover="hover"
                              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 flex items-center justify-center"
                            >
                              {currentStatus === status && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"
                                />
                              )}
                            </motion.span>
                            <span className="text-sm sm:text-base text-gray-700 capitalize">
                              {status}
                            </span>
                          </motion.label>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={attendance.length === 0 || loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all text-sm sm:text-base"
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
