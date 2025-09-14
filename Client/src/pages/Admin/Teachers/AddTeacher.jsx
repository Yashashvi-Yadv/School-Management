import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddTeacher() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken"); // JWT token

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    contact: "",
    subject: [],
  });

  // Update input values
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle subjects as comma-separated array
  const handleSubjects = (e) => {
    setFormData({ ...formData, subject: e.target.value.split(",") });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("No auth token found. Please login.");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_TEACHERS}add`,
        formData, // send form data as body
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token correctly
          },
        }
      );
      alert("Teacher added successfully!");
      navigate("/principal/teachers"); // redirect to dashboard
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.msg || "Error adding teacher");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Dashboard Button */}
      <div className="mb-6">
        <Link
          to="/principal/teachers"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Dashboard
        </Link>
      </div>

      {/* Add Teacher Form */}
      <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="contact"
          placeholder="Contact (used as password)"
          value={formData.contact}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subjects (comma separated)"
          onChange={handleSubjects}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Teacher
        </button>
      </form>
    </div>
  );
}
