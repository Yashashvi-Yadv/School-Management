import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaClipboardList,
  FaEdit,
  FaTrash,
  FaTachometerAlt,
} from "react-icons/fa";
import { ClipboardList, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AttendanceDashboard() {
  const token = localStorage.getItem("authToken");
  const [activeTab, setActiveTab] = useState("take");
  const [teacherSection, setTeacherSection] = useState("");
  const [students, setStudents] = useState([]); // store student list
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Suppose localStorage has { section: "10-A" }
    const section = JSON.parse(localStorage.getItem("teacher"));
    if (section) {
      setTeacherSection(section.assignclass);
    }
  }, []);

  useEffect(() => {
    if (!teacherSection) return;

    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${import.meta.env.VITE_STUDENT}/getforattendence`,
          { section: teacherSection }, // ✅ body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudents(res.data.student || []); // ✅ safe fallback
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [teacherSection, token]);

  const renderContent = () => {
    switch (activeTab) {
      case "take":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ClipboardList size={20} /> Take Attendance
            </h2>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="mb-4 font-medium text-gray-700">
                Section:{" "}
                <span className="font-bold text-blue-600">
                  {teacherSection || "Not Assigned"}
                </span>
              </p>

              {loading ? (
                <p>Loading students...</p>
              ) : (
                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-2 border">Roll No</th>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length > 0 ? (
                      students.map((stu) => (
                        <tr key={stu._id}>
                          <td className="p-2 border">{stu.rollNo}</td>
                          <td className="p-2 border">{stu.name}</td>
                          <td className="p-2 border">
                            <select className="p-1 border rounded-md">
                              <option>Present</option>
                              <option>Absent</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="p-2 text-center text-gray-500"
                        >
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                Submit Attendance
              </button>
            </div>
          </div>
        );

      case "update":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Pencil size={20} /> Update Attendance
            </h2>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-700 font-medium">
                Section:{" "}
                <span className="text-blue-600 font-bold">
                  {teacherSection || "Not Assigned"}
                </span>
              </p>
              <input type="date" className="border p-2 rounded-md mt-2" />
              <button className="ml-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700">
                Fetch Records
              </button>
            </div>
          </div>
        );

      case "delete":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Trash2 size={20} /> Delete Attendance
            </h2>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-700 font-medium">
                Section:{" "}
                <span className="text-blue-600 font-bold">
                  {teacherSection || "Not Assigned"}
                </span>
              </p>
              <input type="date" className="border p-2 rounded-md mt-2" />
              <button className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700">
                Delete Record
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-lg md:h-full sticky top-0">
        <div className="p-4 text-2xl font-bold border-b">Attendance</div>
        <nav className="flex md:flex-col justify-around md:justify-start">
          <button
            onClick={() => navigate("/teacherdashboard")}
            className="flex items-center gap-2 p-4 w-full text-left hover:bg-gray-100"
          >
            <FaTachometerAlt /> Dashboard
          </button>

          <button
            onClick={() => setActiveTab("take")}
            className={`flex items-center gap-2 p-4 w-full text-left ${
              activeTab === "take" ? "bg-blue-100 text-blue-600" : ""
            }`}
          >
            <FaClipboardList /> Take
          </button>
          <button
            onClick={() => setActiveTab("update")}
            className={`flex items-center gap-2 p-4 w-full text-left ${
              activeTab === "update" ? "bg-blue-100 text-blue-600" : ""
            }`}
          >
            <FaEdit /> Update
          </button>
          <button
            onClick={() => setActiveTab("delete")}
            className={`flex items-center gap-2 p-4 w-full text-left ${
              activeTab === "delete" ? "bg-blue-100 text-blue-600" : ""
            }`}
          >
            <FaTrash /> Delete
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
