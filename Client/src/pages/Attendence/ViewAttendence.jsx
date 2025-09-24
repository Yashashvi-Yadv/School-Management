import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ViewAttendance() {
  const token = localStorage.getItem("authToken");
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState(null);

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
        setAttendance(res.data.attendance);
      } else {
        setAttendance(null);
        setError("No attendance recorded for this student on this date");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching attendance");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">View Attendance</h1>
      <h1 className="text-2xl font-bold mb-4 text-center">
        <Link to="/teacher/attendance/">Back</Link>
      </h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Roll Number Input */}
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Enter Student Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="button"
          onClick={fetchStudent}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Fetch Student
        </button>
      </div>

      {/* Display student info */}
      {student && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          <p>
            <strong>Name:</strong> {student.name} <br />
            <strong>Roll No:</strong> {student.rollNo} <br />
            <strong>Class:</strong> {student.className}
          </p>
        </div>
      )}

      {/* Date Input + Fetch Attendance */}
      {student && (
        <div className="mb-4 flex space-x-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={fetchAttendance}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Get Attendance
          </button>
        </div>
      )}

      {/* Display Attendance */}
      {attendance && (
        <div className="mb-4 p-2 bg-yellow-100 rounded">
          <p>
            <strong>Date:</strong> {attendance.date} <br />
            <strong>Status:</strong> {attendance.status}
          </p>
        </div>
      )}
    </div>
  );
}
