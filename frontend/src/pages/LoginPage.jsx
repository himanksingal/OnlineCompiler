import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <AuthForm mode="login" />
      <div className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}
