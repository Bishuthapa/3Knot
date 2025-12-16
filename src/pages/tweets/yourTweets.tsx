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

interface TweetOwner {
  avatar: string;
  username: string;
}

interface Tweet {
  _id: string;
  content: string;
  createdAt: string;
  owner: TweetOwner;
}

const YourTweets = () => {
  const navigate = useNavigate();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchYourTweets = async () => {
      if (!userId) {
        console.error("User not found");
        setLoading(false);
        return;
      }

      try {
        const res = await API.get(`/tweets/${userId}/tweets`);
        setTweets(res.data.data || []); // Set tweets data
      } catch (err) {
        console.error("Error fetching your tweets:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchYourTweets();
  }, [userId]);

  const menuItems = [
    { name: "Home", icon: HomeIcon, path: "/Dashboard" },
    { name: "Dashboard", icon: ChartBarIcon, path: "/Dashboard" },
    { name: "Videos", icon: VideoCameraIcon, path: "/YourVideos" },
    { name: "Tweets", icon: Bars3Icon, path: "/Tweets" },
    { name: "Your Tweets", icon: Bars3Icon, path: "/YourTweets" },
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
          <h2 className="text-white text-xl font-bold">Your Tweets</h2>
        </div>

        {/* Tweets List */}
        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : tweets.length === 0 ? (
          <p className="text-gray-400 text-center">
            You haven't posted any tweets yet.
          </p>
        ) : (
          <div className="space-y-6">
            {tweets.map((tweet) => (
              <div
                key={tweet._id}
                className="bg-gray-800 rounded-lg p-4 hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <div className="flex mb-4">
                  <img
                    src={tweet.owner?.avatar}
                    alt={tweet.owner?.username}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <h3 className="text-white font-semibold text-sm">
                      {tweet.owner?.username || "Unknown"}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {new Date(tweet.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-white">{tweet.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourTweets;
