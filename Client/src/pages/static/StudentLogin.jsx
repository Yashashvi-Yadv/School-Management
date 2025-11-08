import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import axios from "axios";
import Header from "../../components/Header";
import { nav } from "framer-motion/client";

/**
 * TeacherLogin.jsx
 * Minimal login page for teachers with ID + Password.
 * - Tailwind styled, mobile-first
 * - Client-side validation
 * - Show/Hide password
 * - Loading + error states
 * - Uses VITE_API_URL or falls back to http://localhost:8000
 * - On success, saves token to localStorage and navigates to /teacher/dashboard
 */
export default function StudentLogin() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const [form, setForm] = useState({ id: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.id.trim()) return "Teacher ID is required";
    if (!form.password) return "Password is required";
    if (form.password.length < 6)
      return "Password must be at least 6 characters";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);

    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_STUDENT}login`,
        { id: form.id.trim(), password: form.password },
        { withCredentials: true } // ✅ required for cookies
      );
      // Expecting { success: true, token, teacher }
      //   const { token } = res.data || {};
      //   if (!token) throw new Error("Invalid response: token missing");

      //   localStorage.setItem("teacher_token", token);
      if (res.data.success) {
        localStorage.setItem("isloggedin", true);
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("student", JSON.stringify(res.data.user));

        alert(res.data.message);
        navigate("/studentdash");
      } else if (!res.data.success) {
        alert(res.data.message);
        localStorage.removeItem("isloggedin");
        localStorage.removeItem("authToken");
        localStorage.removeItem("student");
      }
    } catch (err) {
      localStorage.removeItem("isloggedin");
      localStorage.removeItem("authToken");
      localStorage.removeItem("student");
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-blue-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-3">
            <LogIn className="w-7 h-7 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-indigo-900">Student Login</h1>
          <p className="text-sm text-gray-600 mt-1">
            Sign in with your Student ID and password
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Student ID
            </label>
            <input
              id="id"
              name="id"
              type="number"
              value={form.id}
              onChange={onChange}
              placeholder="e.g. your contact"
              className="w-full rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none px-4 py-2.5 text-gray-900"
              autoComplete="username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPass ? "number" : "password"}
                value={form.password}
                onChange={onChange}
                placeholder="Your password or type 123"
                className="w-full rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none px-4 py-2.5 pr-12 text-gray-900"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 text-white font-semibold py-2.5 hover:bg-indigo-700 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Not a teacher?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Go back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
