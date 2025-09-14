import { useNavigate, Link } from "react-router-dom";
import {
  UserPlus,
  UserMinus,
  Pencil,
  BookOpen,
  ClipboardList,
  Eye,
} from "lucide-react";

export default function Tstudentdash() {
  const navigate = useNavigate();

  const features = [
    {
      name: "Add Student",
      icon: <UserPlus className="w-10 h-10 text-blue-600" />,
      path: "/teacher/students/add",
      color: "bg-blue-100",
    },
    {
      name: "Update Student",
      icon: <Pencil className="w-10 h-10 text-green-600" />,
      path: "/teacher/students/update",
      color: "bg-green-100",
    },
    {
      name: "Delete Student",
      icon: <UserMinus className="w-10 h-10 text-red-600" />,
      path: "/teacher/students/delete",
      color: "bg-red-100",
    },
    // {
    //   name: "Assign Student",
    //   icon: <ClipboardList className="w-10 h-10 text-purple-600" />,
    //   path: "/teacher/students/assignclass",
    //   color: "bg-purple-100",
    // },
    // {
    //   name: "Assign Student",
    //   icon: <BookOpen className="w-10 h-10 text-yellow-600" />,
    //   path: "/teacher/students/assignsubject",
    //   color: "bg-yellow-100",
    // },
    {
      name: "Show Student",
      icon: <Eye className="w-10 h-10 text-yellow-600" />,
      path: "/teacher/students/show",
      color: "bg-green-100",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixed on left */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Teacher Management</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.name}
              onClick={() => navigate(feature.path)}
              className={`cursor-pointer ${feature.color} rounded-2xl p-6 shadow hover:shadow-lg transition`}
            >
              <div className="flex flex-col items-center space-y-3">
                {feature.icon}
                <h2 className="text-lg font-semibold">{feature.name}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Button */}
        <div className="mt-8">
          <Link
            to="/teacherdashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
