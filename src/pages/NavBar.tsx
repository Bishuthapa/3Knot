// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const Navbar = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const userAvatar = localStorage.getItem("Avatar");
    setAvatar(userAvatar);
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    toast.error('Logout successful 🎉', {duration: 3000, style: {background: '#16a34a', color: '#fff',}});

    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-yellow-50 px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow">
      {/* Left Section (Logo + Home) */}
      <div className="flex items-center gap-4">
        <Link to="/Dashboard" className="text-2xl font-bold text-green-500">
          MyTube
        </Link>
      </div>

      {/* Middle Section (Search Bar) */}
      <div className="flex flex-1 justify-center">
        <input
          type="text"
          placeholder="Search"
          className="w-1/2 px-4 py-2 rounded-l bg-slate-900 border border-gray-600 focus:outline-none"
        />
        <button className="bg-green-700 px-4 py-2 rounded-r hover:bg-green-600">
          🔍
        </button>
      </div>

      

      {/* Right Section (Upload + Avatar) */}
      <div className="flex items-center gap-4">
        <Link
          to="/upload"
          className="bg-green-800 px-3 py-1 rounded hover:bg-green-700"
        >
          ⬆ Upload
        </Link>
         <button className="bg-green-800 px-3 py-1 mr-4 rounded hover:bg-green-700"
        onClick={logoutHandler}
      >
          Logout

      </button>

        {avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-green-600 cursor-pointer"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 text-xs">
              No Avatar
            </div>
        )}
      </div>

     
    </nav>
  );
};

export default Navbar;
