import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function DeleteGrade() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [examName, setExamName] = useState("");
  const [customExam, setCustomExam] = useState("");
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gradeLoading, setGradeLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Step 1: Fetch Student Info
  const fetchStudent = async (e) => {
    e.preventDefault();
    if (!rollNumber.trim()) return setError("Please enter a roll number.");

    setLoading(true);
    setError("");
    setSuccessMsg("");
    setStudent(null);
    setGrades([]);
    setExamName("");
    setCustomExam("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_STUDENT}get`,
        { rollNo: rollNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.student) {
        setStudent(res.data.student);
      } else {
        setError("Student not found. Please check the roll number.");
      }
    } catch (err) {
      console.error("Error fetching student:", err);
      setError(
        err.response?.data?.message ||
          "Error fetching student. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Fetch Grades for Selected Exam
  const fetchGrades = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setGrades([]);

    const finalExamName = customExam.trim()
      ? customExam.trim().toUpperCase()
      : examName.trim().toUpperCase();

    if (!finalExamName) return setError("Please select or enter an exam name.");

    setGradeLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_GRADE}get`,
        { studentId: student._id, examName: finalExamName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.grade?.marks?.length > 0) {
        setGrades(res.data.grade.marks);
      } else {
        setError("No grades found for this exam.");
      }
    } catch (err) {
      console.error("Error fetching grades:", err);
      setError(err.response?.data?.message || "Error fetching grades.");
    } finally {
      setGradeLoading(false);
    }
  };

  // Delete marks
  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (grades.length === 0) return setError("No grades to delete.");

    const finalExamName = customExam.trim()
      ? customExam.trim().toUpperCase()
      : examName.trim().toUpperCase();

    if (
      !confirm(
        `Are you sure you want to delete grades for ${
          examName || customExam
        } for student ${student.name}? This action cannot be undone.`
      )
    ) {
      return;
    }

    setDeleteLoading(true);

    try {
      const res = await axios.delete(`${import.meta.env.VITE_GRADE}delete`, {
        data: { studentId: student._id, examName: finalExamName },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        setSuccessMsg("Grades deleted successfully!");
        setGrades([]);
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setError("Failed to delete grades. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error deleting grades.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

  const totalMarks =
    grades.reduce((sum, g) => sum + Number(g.mark || 0), 0) || 0;
  const percentage =
    grades.length > 0 ? (totalMarks / (grades.length * 100)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col p-4 sm:p-6 md:p-8">
      <div className="flex-grow flex flex-col max-w-2xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text text-transparent mb-4 sm:mb-0">
            Delete Grade
          </h1>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate("/teacher/grade")}
            className="bg-gradient-to-r from-red-700 to-pink-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
          >
            Back
          </motion.button>
        </motion.div>

        {/* Step 1: Search Student */}
        <motion.form
          onSubmit={fetchStudent}
          className="bg-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Search Student by Roll Number
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter Roll Number"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-3 rounded-lg shadow-lg"
            >
              {loading ? "Searching..." : "Fetch Student"}
            </motion.button>
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
          )}
        </motion.form>

        {/* Step 2: Show Student Info & Select Exam */}
        <AnimatePresence>
          {student && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {student.name}
                </h3>
                <p className="text-gray-600">
                  Roll: {student.rollNo} | Class: {student.className}
                </p>
              </div>

              {/* Exam Selector */}
              <form onSubmit={fetchGrades} className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Exam
                </label>
                <select
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={gradeLoading}
                >
                  <option value="">-- Select Exam --</option>
                  <option value="UNIT-TEST 1">UNIT-TEST 1</option>
                  <option value="UNIT-TEST 2">UNIT-TEST 2</option>
                  <option value="UNIT-TEST 3">UNIT-TEST 3</option>
                  <option value="UNIT-TEST 4">UNIT-TEST 4</option>
                  <option value="UNIT-TEST 5">UNIT-TEST 5</option>
                  <option value="MID TERM">MID TERM</option>
                  <option value="FINAL EXAM">FINAL EXAM</option>
                  <option value="OTHER">Other (Custom)</option>
                </select>

                {examName === "OTHER" && (
                  <input
                    type="text"
                    value={customExam}
                    onChange={(e) => setCustomExam(e.target.value)}
                    placeholder="Enter custom exam name"
                    className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    disabled={gradeLoading}
                  />
                )}

                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={gradeLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-3 rounded-lg shadow-lg"
                >
                  {gradeLoading ? "Fetching Grades..." : "Fetch Grades"}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Display Grades & Delete */}
        <AnimatePresence>
          {grades.length > 0 && (
            <motion.form
              onSubmit={handleDelete}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                Grades for {examName || customExam} (To Be Deleted)
              </h3>

              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-700">
                  Total Marks:{" "}
                  <span className="text-blue-700">{totalMarks}</span>
                </h4>
                <p className="text-green-600 font-semibold">
                  Percentage: {percentage.toFixed(2)}%
                </p>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Subject
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Marks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((g, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 text-gray-800">
                          {g.subject}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-medium text-gray-900">
                          {g.mark}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={deleteLoading}
                className="w-full bg-gradient-to-r from-red-600 to-pink-400 text-white font-semibold py-3 rounded-lg shadow-lg"
              >
                {deleteLoading ? "Deleting..." : "Delete Grades"}
              </motion.button>

              {error && (
                <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
              )}
              {successMsg && (
                <p className="text-green-600 text-sm mt-2 text-center font-medium">
                  {successMsg}
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
