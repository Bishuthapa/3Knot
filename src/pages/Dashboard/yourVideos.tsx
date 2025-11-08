import API from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ChartBarIcon,
  VideoCameraIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface VideoOwner {
  avatar: string;
  username: string;
}

interface Video {
  _id: string;
  video: string;
  thumbnail: string;
  title: string;
  description: string;
  owner: VideoOwner;
  createdAt: string;
}

const YourVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);


const userId = localStorage.getItem("userId"); // get the logged-in user's ID

  // Fetch your videos only
  useEffect(() => {
    const fetchYourVideos = async () => {
      try {
        const res = await API.get(`/videos/user/${userId}`);
        setVideos(res.data.data.videos || []);
      } catch (err) {
        console.error("Error fetching your videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchYourVideos();
  }, [userId]);

  const menuItems = [
    { name: "Home", icon: HomeIcon, path: "/Dashboard" },
    { name: "Dashboard", icon: ChartBarIcon, path: "/Dashboard" },
    { name: "Your Videos", icon: VideoCameraIcon, path: "/Yourvideos" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="dashboard-container flex h-screen w-full">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full bg-slate-900 w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-50`}
      >
        {/* Sidebar header (mobile) */}
        <div className="flex items-center justify-between p-4 md:hidden border-b border-slate-700">
          <h1 className="text-white font-bold">Menu</h1>
          <button onClick={() => setIsOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 w-full px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-3 text-gray-300 hover:bg-slate-700 p-2 rounded-lg cursor-pointer transition"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="h-5 w-5 text-gray-400" />
                <span className="font-medium">{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay when sidebar is open (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="bg-gray-900 min-h-screen flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h2 className="text-white text-xl font-bold">Your Uploaded Videos</h2>
        </div>

        {/* Video Grid */}
        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : videos.length === 0 ? (
          <p className="text-gray-400 text-center">
            You haven’t uploaded any videos yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
                onClick={() => navigate(`/watch/${video._id}`, { state: video })}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="flex p-3">
                  <img
                    src={video.owner?.avatar}
                    alt={video.owner?.username}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <h3 className="text-white font-semibold text-sm truncate">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-xs truncate">
                      {video.owner?.username || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourVideos;
