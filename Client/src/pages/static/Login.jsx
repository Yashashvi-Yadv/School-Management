import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      // Send Google token to backend
      const res = await axios.post(
        `${import.meta.env.VITE_AUTHENTICATION_ROUTE}/login`,
        { token }
      );

      if (res.data.success) {
        const { jwt, user, role } = res.data;
        console.log("user", user);

        // Store auth details
        localStorage.setItem("authToken", jwt);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isloggedin", "true");

        alert("✅ Login Successful!");

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
        alert(res.data.message || "❌ Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("⚠️ Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="p-6 rounded-2xl shadow-lg bg-white w-80 text-center">
          <h2 className="text-xl font-semibold mb-4">Login with Google</h2>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("❌ Google Login Failed")}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
