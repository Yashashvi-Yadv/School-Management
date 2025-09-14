import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    className: "",
    section: "",
    email: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${import.meta.env.VITE_STUDENT}add`,
      student,
      {
        headers: {
          Authorization: `Bearer ${token}`, // send token correctly
        },
      }
    );
    res.data.success ? alert(res.data.message) : alert(res.data.message);
    setStudent({
      name: "",
      rollNo: "",
      className: "",
      section: "",
      email: "",
      contact: "",
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Add Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Student Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="rollNo"
            value={student.rollNo}
            onChange={handleChange}
            placeholder="Roll No"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="className"
            value={student.className}
            onChange={handleChange}
            placeholder="Class"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="section"
            value={student.section}
            onChange={handleChange}
            placeholder="Section"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="contact"
            value={student.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Add Student
          </button>
        </form>

        {/* Dashboard Button */}
        <button
          onClick={() => navigate("/teacher/students")}
          className="w-full mt-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
