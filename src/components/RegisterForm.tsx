import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormDataType = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  avatar: File | null;
  coverImage: File | null;
  [key: string]: string | File | null;
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          dataToSend.append(key, value);
        }
      });

      await axios.post(
        "https://backend-1-02dj.onrender.com/api/v1/users/register",
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Registration successful! Redirecting...");
      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: "",
        avatar: null,
        coverImage: null,
      });

      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        {/* Avatar Upload */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload Avatar
        </label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        {/* Avatar Preview */}
        {formData.avatar && (
          <img
            src={URL.createObjectURL(formData.avatar)}
            alt="avatar preview"
            className="w-20 h-20 rounded-full mb-4 object-cover"
          />
        )}

        {/* Cover Image Upload */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload Cover Image
        </label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        {/* Cover Preview */}
        {formData.coverImage && (
          <img
            src={URL.createObjectURL(formData.coverImage)}
            alt="cover preview"
            className="w-full h-32 mb-4 object-cover rounded"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 rounded transition`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
