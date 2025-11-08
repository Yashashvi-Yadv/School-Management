import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, recordStats } from "framer-motion";
import axios from "axios";

export default function AddGrade() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addingGrade, setAddingGrade] = useState(false);
  const [gradeData, setGradeData] = useState({});
  const [examName, setExamName] = useState(""); // ✅ new
  const [customExam, setCustomExam] = useState(""); // ✅ for custom entry
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Fetch student data
  const fetchStudent = async (e) => {
    e.preventDefault();

    if (!rollNumber.trim()) return setError("Please enter a roll number.");

    setLoading(true);
    setError("");
    setSuccess("");
    setStudent(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_STUDENT}get`,
        { rollNo: rollNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.student) {
        setStudent(res.data.student);

        const subjects = res.data.student.subject || [];
        const initialGrades = {};
        subjects.forEach((subj) => {
          initialGrades[subj] = "";
        });
        setGradeData(initialGrades);
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

  // ✅ Add grade to backend
  const addGrade = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const finalExamName = customExam.trim()
      ? customExam.trim().toUpperCase()
      : examName.trim().toUpperCase();

    if (!finalExamName) return setError("Please select or enter an exam name.");

    setAddingGrade(true);

    try {
      const grades = Object.entries(gradeData).map(([subject, mark]) => ({
        subject,
        mark,
      }));

      const res = await axios.post(
        `${import.meta.env.VITE_GRADE}add`,
        { studentId: student._id, examName: finalExamName, grades },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setSuccess(res.data.message || "Grades added successfully!");
        setGradeData({});
        setExamName("");
        setCustomExam("");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error adding grade:", err);
      setError(err.response?.data?.message || "Error adding grade.");
    } finally {
      setAddingGrade(false);
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

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
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-4 sm:mb-0">
            Add Grade
          </h1>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate("/teacher/grade")}
            className="bg-gradient-to-r from-purple-700 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
          >
            Back
          </motion.button>
        </motion.div>

        {/* Search Student */}
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

        {/* Student Info + Auto-filled Subjects */}
        <AnimatePresence>
          {student && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {student.name}
                </h3>
                <p className="text-gray-600">
                  Roll: {student.rollNo} | Class: {student.className}
                </p>
              </div>

              {/* ✅ Exam Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Exam
                </label>
                <select
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Exam --</option>
                  <option value="Unit-Test 1">Unit-Test 1</option>
                  <option value="Unit-Test 2">Unit-Test 2</option>
                  <option value="Unit-Test 3">Unit-Test 3</option>
                  <option value="Unit-Test 4">Unit-Test 4</option>
                  <option value="Unit-Test 5">Unit-Test 5</option>
                  <option value="Mid Term">Mid Term</option>
                  <option value="Final">Final</option>
                  <option value="Other">Other (Custom)</option>
                </select>

                {/* ✅ If 'Other', show input */}
                {examName === "Other" && (
                  <input
                    type="text"
                    value={customExam}
                    onChange={(e) => setCustomExam(e.target.value)}
                    placeholder="Enter custom exam name"
                    className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {/* ✅ Subjects input */}
              <form onSubmit={addGrade} className="space-y-6">
                {student?.subject?.map((subj, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject: {subj}
                    </label>
                    <input
                      type="number"
                      placeholder="Enter marks (0–100)"
                      min="0"
                      max="100"
                      value={gradeData[subj] || ""}
                      onChange={(e) =>
                        setGradeData({
                          ...gradeData,
                          [subj]: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}

                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={addingGrade}
                  className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold py-3 rounded-lg shadow-lg"
                >
                  {addingGrade ? "Adding Grades..." : "Add Grades"}
                </motion.button>
              </form>

              {error && (
                <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm mt-4 text-center font-medium">
                  {success}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
