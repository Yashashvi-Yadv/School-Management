import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  ClipboardList,
  BarChart,
  LogOut,
  NotebookTabs,
} from "lucide-react";

export default function TeacherDashboard() {
  const [open, setOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("student"));

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, link: "/studentdash" },
    {
      name: "Attendance",
      icon: <ClipboardList size={20} />,
      link: "/student/attendance",
    },
    {
      name: "Gradebook",
      icon: <NotebookTabs size={20} />,
      link: "/student/grade/view",
    },
    { name: "Reports", icon: <BarChart size={20} />, link: "/teacher/reports" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-blue-700 text-white transition-all duration-300 p-4`}
      >
        <h1 className="text-2xl font-bold mb-8">
          {open ? user?.name + " Student " : "S"}
        </h1>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 p-2 hover:bg-blue-600 rounded cursor-pointer"
            >
              {item.icon}
              {open && (
                <Link to={item.link} className="w-full block">
                  {item.name}
                </Link>
              )}
            </li>
          ))}

          {/* Logout */}
          <li className="flex items-center space-x-3 p-2 hover:bg-blue-600 rounded cursor-pointer mt-8">
            <LogOut size={20} />
            {open && (
              <Link to="/logout" className="w-full block">
                Logout
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white shadow px-6 py-4">
          <button
            onClick={() => setOpen(!open)}
            className="text-blue-700 font-bold"
          >
            ☰
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1 w-1/3"
          />
          <div className="flex items-center space-x-3">
            <img
              src={user?.picture}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Teacher</span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Total Student</h2>
            <p className="text-2xl font-bold text-blue-700">25</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Classes</h2>
            <p className="text-2xl font-bold text-blue-700">18</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Attendance Today</h2>
            <p className="text-2xl font-bold text-blue-700">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
