import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth";

export default function AuthForm({ mode }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isRegister = mode === "register";

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            let response;
            if (isRegister) {
                response = await registerUser(form);
            } else {
                const { email, password } = form;
                response = await loginUser({ email, password });
            }
            // TEMP: Show feedback and redirect
            alert(response.message);
            if (isRegister) {
                // After registration, go to Login page
                setTimeout(() => {
                    navigate("/login");
                }, 800);
            } else {
                // After login, go to Dashboard
                setTimeout(() => {
                    navigate("/dashboard");
                }, 800);
            }
        } catch (err) {
            setError(err.message || "Something went wrong!");
        }
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl px-8 py-10"
            autoComplete="off"
        >
            <div className="flex flex-col items-center mb-6">
                <img src="/logo.png" alt="Logo" className="w-30 mb-5" />
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {isRegister ? "Create your Account" : "Welcome back"}
                </h2>
                <div className="text-gray-500 text-sm mb-2">
                    {isRegister
                        ? "Join the FinSight community!"
                        : "Log in to start managing finances."}
                </div>
            </div>

            {error && (
                <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded mb-4">
                    {error}
                </div>
            )}

            {isRegister && (
                <>
                    <input
                        required
                        name="firstname"
                        placeholder="First Name"
                        className="w-full mb-4 bg-[#f3f4f6] py-2 px-3 rounded border-none focus:outline-indigo-400"
                        value={form.firstname}
                        onChange={handleChange}
                    />
                    <input
                        required
                        name="lastname"
                        placeholder="Last Name"
                        className="w-full mb-4 bg-[#f3f4f6] py-2 px-3 rounded border-none focus:outline-indigo-400"
                        value={form.lastname}
                        onChange={handleChange}
                    />
                </>
            )}
            <input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="w-full mb-4 bg-[#f3f4f6] py-2 px-3 rounded border-none focus:outline-indigo-400"
                value={form.email}
                onChange={handleChange}
            />
            <input
                required
                type="password"
                name="password"
                placeholder="Password"
                className="w-full mb-6 bg-[#f3f4f6] py-2 px-3 rounded border-none focus:outline-indigo-400"
                value={form.password}
                onChange={handleChange}
            />

            <button
                type="submit"
                className="w-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white font-semibold py-2 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition disabled:opacity-50"
                disabled={loading}
            >
                {loading
                    ? isRegister
                        ? "Creating Account..."
                        : "Logging in..."
                    : isRegister
                        ? "Register"
                        : "Login"}
            </button>
        </form>
    );
}
