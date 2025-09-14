import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Signup() {
  // Handle Google signup/login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      // Send token to backend
      const res = await axios.post(`${import.meta.env.VITE_AUTHENTICATION_ROUTE}signin`, { token });

      if (res.data.success) {
        const { jwt, user, role } = res.data;

        // Save auth details
        localStorage.setItem("authToken", jwt);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isloggedin", "true");

        alert("✅ Signup/Login successful!");

        // Redirect based on role
        if (role === "admin") {
          window.location.href = "/principaldashboard";
        } else if (role === "teacher") {
          window.location.href = "/teacherdashboard";
        } else if (role === "student") {
          window.location.href = "/studentdashboard";
        } else {
          window.location.href = "/";
        }
      } else {
        alert(res.data.message || "❌ Signup/Login failed");
      }
    } catch (err) {
      console.error("Google signup error:", err);
      alert("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-100 to-blue-200 px-4">
        <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Signup
          </h2>

          {/* Manual Signup Form (Optional - can be added later) */}

          {/* Divider */}
          <div className="my-6 flex items-center">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Signup */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.log("❌ Google Signup/Login Failed");
              }}
            />
          </div>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-medium">
              Login
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
