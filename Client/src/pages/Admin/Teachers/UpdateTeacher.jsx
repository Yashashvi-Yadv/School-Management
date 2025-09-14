import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateTeacher() {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [searchnumber, setSearchnumber] = useState(""); // to find teacher
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    contact: "",
    subject: [],
    assignclass: "",
  });
  const [teacherFound, setTeacherFound] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle subject input
  const handleSubjects = (e) => {
    setFormData({ ...formData, subject: e.target.value.split(",") });
  };

  // Fetch teacher by email
  const fetchTeacher = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_TEACHERS}/get/${searchnumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data) {
        setFormData(res.data.teacher); // prefill form
        setTeacherFound(true);
      } else {
        alert("Teacher not found!");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching teacher");
    }
  };

  // Update teacher
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_TEACHERS}/update/${formData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Teacher updated successfully!");
      navigate("/principal/teachers");
    } catch (err) {
      console.error(err);
      alert("Error updating teacher");
    }
  };
  console.log(formData);

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

      <h2 className="text-2xl font-bold mb-4">Update Teacher</h2>

      {/* Step 1: Search Teacher */}
      {!teacherFound && (
        <div className="space-y-4 mb-6">
          <input
            type="number"
            placeholder="Enter Teacher id"
            value={searchnumber}
            onChange={(e) => setSearchnumber(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={fetchTeacher}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Fetch Teacher
          </button>
        </div>
      )}

      {/* Step 2: Update Form (only show if teacher found) */}
      {teacherFound && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData?.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData?.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="contact"
            placeholder="Contact"
            value={formData?.contact}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="assignclass"
            placeholder="Class"
            value={formData?.assignclass}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subjects (comma separated)"
            value={formData?.subject?.join(",")}
            onChange={handleSubjects}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Update Teacher
          </button>
        </form>
      )}
    </div>
  );
}
