import { useNavigate, Link } from "react-router-dom";
import { UserPlus, UserMinus, Pencil, BookOpen, ClipboardList, Eye } from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const features = [
    {
      name: "Update Teacher",
      icon: <Pencil className="w-10 h-10 text-green-600" />,
      path: "/principal/student/update",
      color: "bg-green-100",
    },
    {
      name: "Delete Teacher",
      icon: <UserMinus className="w-10 h-10 text-red-600" />,
      path: "/principal/student/delete",
      color: "bg-red-100",
    },
    {
      name: "Assign Class",
      icon: <ClipboardList className="w-10 h-10 text-purple-600" />,
      path: "/principal/student/assignclass",
      color: "bg-purple-100",
    },
    {
      name: "Assign Subject",
      icon: <BookOpen className="w-10 h-10 text-yellow-600" />,
      path: "/principal/student/assignsubject",
      color: "bg-yellow-100",
    },
    {
      name: "Show Teacher", 
      icon: <Eye   className="w-10 h-10 text-yellow-600" />,
      path: "/principal/student/show",
      color: "bg-green-100",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixed on left */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Student Management</h1>

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
            to="/principaldashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
