import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function UpdateAttendance() {
  const token = localStorage.getItem("authToken");
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch student by roll number
  const fetchStudent = async () => {
    setError(null);
    setStudent(null);
    setAttendance(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_STUDENT}/get`,
        { rollNo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setStudent(res.data.student);
      } else {
        setError("Student not found");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching student");
    }
  };

  // Fetch attendance by studentId + date
  const fetchAttendance = async () => {
    if (!student) {
      setError("Please fetch the student first");
      return;
    }
    setError(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_ATTENDENCE}/getattendence`,
        { studentId: student._id, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setAttendance(
          res.data.attendance
            ? {
                ...res.data.attendance,
                status: res.data.attendance.status || "present",
              }
            : null
        );
        if (!res.data.attendance) {
          setError("No attendance recorded for this student on this date");
        }
      } else {
        setAttendance(null);
        setError("No attendance recorded for this student on this date");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching attendance");
    }
  };

  // Change status of an attendance record
  const handleStatusChange = (status) => {
    setAttendance((prev) => ({ ...prev, status }));
  };

  // Update attendance
  const updateAttendance = async () => {
    if (!attendance) {
      setError("No attendance data to update");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_ATTENDENCE}/update`,
        {
          studentId: student._id,
          date,
          status: attendance.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message || "Attendance updated successfully");
    } catch (err) {
      console.error(err);
      setError("Error updating attendance");
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
          Update Attendance
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-blue-700 mb-4 sm:mb-6"
        >
          <Link to="/teacher/attendance/">Back</Link>
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

        {/* Roll Number Input */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3"
        >
          <input
            type="text"
            placeholder="Enter Student Roll No"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
          />
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={fetchStudent}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 sm:px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all text-sm sm:text-base"
          >
            Fetch Student
          </motion.button>
        </motion.div>

        {/* Display student info */}
        <AnimatePresence>
          {student && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-gray-800 text-sm sm:text-base">
                <strong>Name:</strong> {student.name} <br />
                <strong>Roll No:</strong> {student.rollNo} <br />
                <strong>Class:</strong> {student.className}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Date Selection */}
        <AnimatePresence>
          {student && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 sm:mb-6"
            >
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="flex-1">
                  <label className="block font-medium mb-1 text-sm sm:text-base">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                  />
                </div>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={fetchAttendance}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 sm:px-6 rounded-lg shadow-md hover:bg-green-700 transition-all text-sm sm:text-base self-end"
                >
                  Fetch Attendance
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Display and Update Attendance */}
        <AnimatePresence>
          {attendance && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              onSubmit={updateAttendance}
              className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-50/90 backdrop-blur-sm rounded-lg shadow-md border border-yellow-200"
            >
              <h2 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 text-gray-800">
                Attendance Record
              </h2>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 sm:p-3 bg-gray-100/80 rounded-lg">
                <p className="text-sm sm:text-base text-gray-800 mb-2 sm:mb-0">
                  <strong>Date:</strong> {attendance.date}
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
                        checked={attendance.status === status}
                        onChange={() => handleStatusChange(status)}
                        className="hidden"
                      />
                      <motion.span
                        variants={radioVariants}
                        animate={
                          attendance.status === status ? "checked" : "unchecked"
                        }
                        whileHover="hover"
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 flex items-center justify-center"
                      >
                        {attendance.status === status && (
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
              </div>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all text-sm sm:text-base"
              >
                {loading ? "Updating..." : "Update Attendance"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
