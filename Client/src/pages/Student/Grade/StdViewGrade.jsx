import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function StdViewGrade() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const studentData = localStorage.getItem("student");
  const [student, setStudent] = useState(null);
  const [examName, setExamName] = useState("");
  const [customExam, setCustomExam] = useState("");
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gradeLoading, setGradeLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Step 1: Fetch Student Info
  useEffect(() => {
    const fetchStudent = async () => {
      if (!token || !studentData) {
        navigate("/login");
        return;
      }

      setLoading(true);
      setError("");
      setStudent(null);
      setGrades([]);

      try {
        const students = JSON.parse(studentData); // Parse the JSON string from localStorage
        const res = await axios.post(
          `${import.meta.env.VITE_STUDENT}getforgrade`,
          { rollNo: students.rollNo },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data?.student) {
          setStudent(res.data.student);
        } else {
          setError("No record found.");
        }
      } catch (err) {
        // Handle status code 400 specifically
        if (err.response?.status === 400) {
          setError(err.response?.data?.message || "No record found.");
        } else {
          setError("No record found.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [navigate, token, studentData]);

  // ✅ Step 2: Fetch Grades for Selected Exam
  const fetchGrades = async (e) => {
    e.preventDefault();
    setError("");
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

      const data = res.data;

      if (data.success === false) {
        alert(data.message || "No grade found.");
        setGrades([]); // clear previous grades if not found
      } else if (data.grade) {
        setGrades(data.grade.marks); // adjust based on your Mark model structure
      } else {
        alert("Unexpected response from server.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching grades.");
    } finally {
      setGradeLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

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
            View Grade
          </h1>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate("/studentdash/")}
            className="bg-gradient-to-r from-purple-700 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
          >
            Back
          </motion.button>
        </motion.div>

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
                >
                  <option value="">-- Select Exam --</option>
                  <option value="UNIT-TEST 1">UNIT-TEST 1</option>
                  <option value="UNIT-TEST 2">UNIT-TEST 2</option>
                  <option value="UNIT-TEST 3">UNIT-TEST 3</option>
                  <option value="UNIT-TEST 5">UNIT-TEST 5</option>
                  <option value="MID TERM">MID TERM</option>
                  <option value="FINAL">FINAL</option>
                  <option value="OTHER">Other (Custom)</option>
                </select>

                {examName === "OTHER" && (
                  <input
                    type="text"
                    value={customExam}
                    onChange={(e) => setCustomExam(e.target.value)}
                    placeholder="Enter custom exam name"
                    className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                )}

                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={gradeLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold py-3 rounded-lg shadow-lg"
                >
                  {gradeLoading ? "Fetching Grades..." : "Fetch Grades"}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        {error && !student && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 text-center">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Step 3: Display Grades */}
        <AnimatePresence>
          {grades.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                Grades for {examName || customExam}
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

              <div className="overflow-x-auto">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
