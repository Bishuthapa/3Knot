import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Video = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoFile: string;
  owner: {
    username: string;
    avatar: string;
  };
};

const AllVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://backend-1-02dj.onrender.com/api/v1/videos?query=${searchQuery}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVideos(res.data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 shadow-lg p-4 flex flex-col transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} fixed md:relative z-20`}
      >
        <h2 className="text-xl font-bold mb-6">MyTube</h2>
        <nav className="flex flex-col space-y-4">
          <a href="/home" className="hover:text-blue-500">Home</a>
          <a href="/subscriptions" className="hover:text-blue-500">Subscriptions</a>
          <a href="/library" className="hover:text-blue-500">Library</a>
          <a href="/history" className="hover:text-blue-500">History</a>
          <a href="/upload" className="hover:text-green-500 font-semibold">Upload Video</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow flex items-center justify-between px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-xl hidden md:block">MyTube</h1>
          </div>

          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1 w-1/2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search videos"
              className="ml-2 bg-transparent focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Logout */}
          <button
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </header>

        {/* Video Grid */}
        <main className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">All Videos</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading videos...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : videos.length === 0 ? (
            <p className="text-center text-gray-500">No videos found.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => window.open(video.videoFile, "_blank")}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg truncate">{video.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <img
                        src={video.owner.avatar || "/default-avatar.png"}
                        alt={video.owner.username}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-gray-500 text-xs">{video.owner.username}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllVideos;
