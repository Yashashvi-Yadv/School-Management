import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const token = localStorage.getItem("authToken")

  useEffect(() => {
    // Fetch teachers from API (replace with your backend endpoint)
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_TEACHERS}/show`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setTeachers(res.data.teacher);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="p-6">
        <div className="mb-6">
        <Link
          to="/principal/teachers"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Dashboard
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">All Teachers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Contact</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Class</th>
            </tr>
          </thead>
          <tbody>
            {teachers?.length > 0 ? (
              teachers.map((teacher, index) => (
                <tr key={teacher._id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{teacher.teacherid}</td>
                  <td className="px-4 py-2 border">{teacher.name}</td>
                  <td className="px-4 py-2 border">{teacher.email}</td>
                  <td className="px-4 py-2 border">{teacher.contact}</td>
                  <td className="px-4 py-2 border">{teacher.subject}</td>
                  <td className="px-4 py-2 border">{teacher.assignclass}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-4 border text-center text-gray-500"
                >
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
