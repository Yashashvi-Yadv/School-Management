import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SendNotificationForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [recipientType, setRecipientType] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const token = localStorage.getItem("authToken");

  // ✅ Fetch student list on page load
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_STUDENT}show`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(res.data.student || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  // ✅ Send notification
  const handleSend = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    try {
      setIsSending(true);
      const res = await axios.post(
        `${import.meta.env.VITE_NOTIFICATION}teachersend`,
        {
          title,
          message,
          type,
          recipientType,
          recipientId: recipientType === "student" ? selectedStudent : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        setTitle("");
        setMessage("");
        setType("info");
        setRecipientType("all");
        setSelectedStudent("");
      } else {
        alert(res.data.message);
        setTitle("");
        setMessage("");
        setType("info");
        setRecipientType("all");
        setSelectedStudent("");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("❌ Failed to send notification");
    } finally {
      setIsSending(false);
    }
  };

  const handleBack = () => {
    navigate("/teacher/notification");
  };

  // 🎨 Badge colors for notification types
  const badgeColors = {
    info: "bg-blue-100 text-blue-700",
    warning: "bg-yellow-100 text-yellow-800",
    success: "bg-green-100 text-green-700",
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-md sm:max-w-lg lg:max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        {/* Back Button */}
        <motion.button
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-4 sm:mb-6 inline-flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-2 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 w-full sm:w-auto justify-center"
        >
          ← Back to Dashboard
        </motion.button>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center">
          📢 Send Notification
        </h2>

        <form onSubmit={handleSend} className="space-y-4 sm:space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] sm:min-h-[100px]"
              required
            ></textarea>
          </div>

          {/* Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Notification Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
            </select>
            {/* Visual badge for type */}
            <span
              className={`inline-flex mt-1 px-2 py-1 rounded-full text-xs font-medium ${badgeColors[type]}`}
            >
              {type.toUpperCase()}
            </span>
          </div>

          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Send To
            </label>
            <select
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Students</option>
              <option value="student">Specific Student</option>
            </select>
          </div>

          {/* Student dropdown only if “Specific Student” selected */}
          {recipientType === "student" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="overflow-hidden"
            >
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Choose Student
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a Student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    🎓 {student.rollNo} — {student.name}
                  </option>
                ))}
              </select>
            </motion.div>
          )}

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={
              isSending || (recipientType === "student" && !selectedStudent)
            }
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isSending ? "Sending..." : "Send Notification"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};
