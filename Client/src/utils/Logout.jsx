import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear storage
    localStorage.clear();

    // Redirect to home page
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // nothing to show, just redirect
}
