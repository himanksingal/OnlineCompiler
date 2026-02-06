import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { fetchMe } from "../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    fetchMe()
      .then(user => {
        if (user?.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else if (user?.role === "user") {
          navigate("/", { replace: true });
        }
      })
      .catch(() => { /* Not logged in: show login form */ });
  }, [navigate]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <AuthForm mode="login" />
      <div className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/register" className="text-indigo-600 hover:underline">
          Register
        </a>
      </div>
    </div>
  );
}
