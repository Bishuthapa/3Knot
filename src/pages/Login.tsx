import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = identifier.includes("@")
      ? { email: identifier, password }
      : { username: identifier, password };

    try {
      const res = await API.post(
        "/users/login",
        payload
      );
      //console.log("Login successful:", res.data);
      //console.log(res.data);
     

      localStorage.setItem("mytoken", res.data.data.accessToken);
      localStorage.setItem("userId", res.data.data.user._id);
      localStorage.setItem("Avatar", res.data.data.user.avatar);
      localStorage.setItem("CoverImage", res.data.data.user.coverImage);

      toast.success("Login successful 🎉", {
        duration: 3000,
        style: {
          background: "#16a34a",
          color: "#fff",
        },
      });

      navigate("/Dashboard");
    } catch (error) {
         const err = error as AxiosError<{ message?: string }>;
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
        toast.error("Login failed! Please check your credentials.");
      } else {
        console.error("Error:", err.message);
        toast.error("Something went wrong. Try again!");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-slate-800 text-yellow-50 min-h-screen flex justify-center items-center">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold border-b border-green-800 pb-4">
          Login Page
        </h1>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <input
            onChange={(e) => setIdentifier(e.target.value)}
            id="identifier"
            name="identifier"
            placeholder="Email or Username"
            required
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 bg-slate-800 text-yellow-50"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 bg-slate-800 text-yellow-50"
          />
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 bg-green-800 text-yellow-50 py-2 rounded transition flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-yellow-50 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Login"
            )}
          </button>
          <div className="text-center mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-800 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
