import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdateStudent() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  // ✅ Fetch student by Roll No
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
        setStudent(res.data.student);
        setFormData(res.data.student); // pre-fill form with student details
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

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Handle subject input separately (comma separated)
  const handleSubjectsChange = (e) => {
    const subjects = e.target.value.split(",").map((s) => s.trim());
    setFormData((prev) => ({ ...prev, subject: subjects }));
  };

  // ✅ Update student details
  const handleUpdate = async () => {
    if (!student?._id) {
      setMessage("No student selected");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_STUDENT}update`,
        { studentId: student._id, ...formData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(res.data.message);
      if (res.data.success) {
        setStudent(null);
        setRollNo("");
        setFormData({});
      }
    } catch (error) {
      setMessage("Error updating student");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Update Student</h2>

      {/* Roll No Search */}
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
        <button
          onClick={() => navigate("/teacher/students")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Dashboard
        </button>
      </div>

      {message && <p className="mt-3 text-red-500">{message}</p>}

      {/* Update Form */}
      {student && (
        <div className="mt-5 p-3 border rounded bg-gray-50">
          <h3 className="font-semibold mb-3">Edit Student Details</h3>

          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full rounded mb-2"
          />

          <input
            type="text"
            name="className"
            value={formData.className || ""}
            onChange={handleChange}
            placeholder="Class Name"
            className="border p-2 w-full rounded mb-2"
          />

          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full rounded mb-2"
          />

          <input
            type="number"
            name="contact"
            value={formData.contact || ""}
            onChange={handleChange}
            placeholder="Contact"
            className="border p-2 w-full rounded mb-2"
          />

          <input
            type="number"
            name="rollNo"
            value={formData.rollNo || ""}
            onChange={handleChange}
            placeholder="Roll No"
            className="border p-2 w-full rounded mb-2"
          />

          <input
            type="text"
            name="section"
            value={formData.section || ""}
            onChange={handleChange}
            placeholder="Section"
            className="border p-2 w-full rounded mb-2"
          />

          {/* Subject (comma separated) */}
          <input
            type="text"
            name="subject"
            value={formData.subject ? formData.subject.join(", ") : ""}
            onChange={handleSubjectsChange}
            placeholder="Subjects (comma separated)"
            className="border p-2 w-full rounded mb-2"
          />

          {/* Teacher IDs (optional, if you want editable) */}
          {/* <input
            type="text"
            name="teacher"
            value={formData.teacher ? formData.teacher.join(", ") : ""}
            onChange={(e) =>
              setFormData({ ...formData, teacher: e.target.value.split(",") })
            }
            placeholder="Teacher IDs (comma separated)"
            className="border p-2 w-full rounded mb-2"
          /> */}

          <button
            onClick={handleUpdate}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
