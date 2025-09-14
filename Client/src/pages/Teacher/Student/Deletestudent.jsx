import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Deletestudent() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  // ✅ Fetch student details by Roll No
  const handleSearch = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_STUDENT}get`,
        { rollNo },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setStudent(res.data.student); // student includes _id
        setMessage("");
      } else {
        setStudent(null);
        setMessage(res.data.message || "Student not found");
      }
    } catch (error) {
      setMessage("Error fetching student details");
      console.error(error);
    }
  };

  // ✅ Delete student by _id
  const handleDelete = async () => {
    if (!student?._id) {
      setMessage("No student selected");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_STUDENT}delete`,
        { studentId: student._id }, // send _id
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(res.data.message);
      if (res.data.success) {
        setStudent(null);
        setRollNo("");
      }
    } catch (error) {
      setMessage("Error deleting student");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Delete Student</h2>

      {/* Input for Roll No */}
      <input
        type="text"
        placeholder="Enter Roll No"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        className="border p-2 w-full rounded mb-3"
      />

      <div className="flex gap-3">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search Student
        </button>

        {/* Dashboard button */}
        <button
          onClick={() => navigate("/teacher/students")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Dashboard
        </button>
      </div>

      {message && <p className="mt-3 text-red-500">{message}</p>}

      {/* Show student details if found */}
      {student && (
        <div className="mt-5 p-3 border rounded bg-gray-50">
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Roll No:</strong> {student.rollNo}
          </p>
          <p>
            <strong>Class:</strong> {student.class}
          </p>

          <button
            onClick={handleDelete}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Student
          </button>
        </div>
      )}
    </div>
  );
}
