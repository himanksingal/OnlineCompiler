import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <AuthForm mode="register" />
      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
