import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function StdViewAttendance() {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("student");
  const [searchType, setSearchType] = useState(""); // "single" or "range"
  const [date, setDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Only search when user clicks
  const fetchAttendance = async () => {
    if (!searchType) return setError("Please select a search type first");
    if (searchType === "single" && !date)
      return setError("Please select a date");
    if (searchType === "range" && (!fromDate || !toDate))
      return setError("Please select both From and To dates");

    setError(null);
    setLoading(true);

    try {
      const payload =
        searchType === "single"
          ? { date, searchType, teacherid: user.teacherid }
          : {
              startDate: fromDate,
              endDate: toDate,
              teacherid: user.teacherid,
              searchType: "range",
            };

      const res = await axios.post(
        `${import.meta.env.VITE_ATTENDENCE}/getatforstudent`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success && res.data.attendance.length > 0) {
        setAttendance(res.data.attendance);
        setError(null);
      } else {
        setAttendance(null);
        setError("No attendance found for the selected date(s)");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching attendance");
    } finally {
      setLoading(false);
    }
  };

  // Animation for radio buttons
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
    hover: { scale: 1.15, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
        >
          View Attendance
        </motion.h1>

        <h1 className="text-lg font-semibold text-center text-blue-700 mb-4">
          <Link to="/student/attendance/">Back</Link>
        </h1>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg shadow-md text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Radio Button Section */}
        <div className="mb-6 text-center">
          <div className="flex flex-col sm:flex-row sm:space-x-6 justify-center items-center mb-3">
            {/* Single Date */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="single"
                checked={searchType === "single"}
                onChange={(e) => setSearchType(e.target.value)}
                className="hidden"
              />
              <motion.span
                variants={radioVariants}
                animate={searchType === "single" ? "checked" : "unchecked"}
                whileHover="hover"
                className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center"
              >
                {searchType === "single" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2.5 h-2.5 bg-white rounded-full"
                  />
                )}
              </motion.span>
              <span className="text-gray-700 font-medium">Single Day</span>
            </label>

            {/* Date Range */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="range"
                checked={searchType === "range"}
                onChange={(e) => setSearchType(e.target.value)}
                className="hidden"
              />
              <motion.span
                variants={radioVariants}
                animate={searchType === "range" ? "checked" : "unchecked"}
                whileHover="hover"
                className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center"
              >
                {searchType === "range" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2.5 h-2.5 bg-white rounded-full"
                  />
                )}
              </motion.span>
              <span className="text-gray-700 font-medium">Date Range</span>
            </label>
          </div>

          {/* Conditional Date Inputs */}
          {searchType === "single" && (
            <div className="flex justify-center mt-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          )}

          {searchType === "range" && (
            <div className="flex justify-center gap-3 mt-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          )}

          {/* Search Button */}
          {searchType && (
            <div className="text-center mt-4">
              <button
                onClick={fetchAttendance}
                disabled={loading}
                className={`${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"
                } text-white px-6 py-2 rounded-lg shadow-md transition-all`}
              >
                {loading ? "Loading..." : "Search Attendance"}
              </button>
            </div>
          )}
        </div>

        {/* Attendance Display */}
        {attendance && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 shadow-md"
          >
            {Array.isArray(attendance) && attendance.length > 0 ? (
              attendance.map((record, i) => (
                <p key={i} className="text-gray-800 mb-2">
                  <strong>Date:</strong> {record.date} <br />
                  <strong>Status:</strong> {record.status}
                </p>
              ))
            ) : (
              <p>No records found.</p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
