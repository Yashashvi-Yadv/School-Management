import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

          // Initialize attendance state for each student
          setAttendance(
            res.data.student.map((s) => ({
              studentId: s._id,
              status: "present", // default
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
        attendance, // [{ studentId, status }, ...]
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

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Take Attendance</h1>
      <h1 className="text-2xl font-bold mb-4 text-center">
        <Link to="/teacher/attendance">Back</Link>
      </h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        {/* Date Picker */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Students List */}
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Students</h2>
          {students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            <div className="space-y-2">
              {students.map((student) => {
                const currentStatus =
                  attendance.find((a) => a.studentId === student._id)?.status ||
                  "present";

                return (
                  <div
                    key={student._id}
                    className="flex justify-between p-2 bg-gray-100 rounded"
                  >
                    <p>
                      {student.name} (Roll: {student.rollNo}, Class:{" "}
                      {student.className})
                    </p>
                    <div className="flex space-x-2">
                      {["present", "absent", "late"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() =>
                            handleStatusChange(student._id, status)
                          }
                          className={`px-2 py-1 rounded text-sm ${
                            currentStatus === status
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={attendance.length === 0 || loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Attendance"}
        </button>
      </form>
    </div>
  );
}
