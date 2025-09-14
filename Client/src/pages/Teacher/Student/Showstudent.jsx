import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Showstudent() {
  const [students, setStudents] = React.useState([]);
  const token = localStorage.getItem("authToken");

  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_STUDENT}show`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudents(res.data.student || []);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, [token]);

  return (
    <div className="p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/teacher/students"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Dashboard
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">All Students</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">S.No</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Roll No</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Class</th>
              <th className="px-4 py-2 border">Section</th>
              <th className="px-4 py-2 border">Contact</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((stu, index) => (
                <tr key={stu._id || index} className="hover:bg-gray-50">
                  {/* S.No instead of _id */}
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{stu.name}</td>
                  <td className="px-4 py-2 border">{stu.email}</td>
                  <td className="px-4 py-2 border">{stu.rollNo}</td>
                  <td className="px-4 py-2 border">{stu.subject || "-"}</td>
                  <td className="px-4 py-2 border">{stu.className}</td>
                  <td className="px-4 py-2 border">{stu.section}</td>
                  <td className="px-4 py-2 border">{stu.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-4 py-4 border text-center text-gray-500"
                >
                  No Student found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
