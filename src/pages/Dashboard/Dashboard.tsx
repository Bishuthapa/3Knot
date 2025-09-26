import API from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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
  createdAt: string; // or Date
}


const Dashboard = () => {
  const navigate = useNavigate();
  const avatar = localStorage.getItem("Avatar");
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {

  API.get("/videos")
    .then((res) => {
      console.log(res.data.data.videos);
      setVideos(res.data.data.videos)})
    .catch((err) => console.error(err));
    
}, []);

useEffect(() => {

  API.get("/videos?search=${query}")
  
})

//const [query, setQuery] = useState(''); // State to store the search query


  return (
    <div className="dashboard-container flex h-screen w-full">
      {/* Sidebar */}
      <div className="side-nav bg-slate-700 w-64 flex flex-col items-center py-6">
        <div className="profile-container flex flex-col items-center w-24 h-24 rounded-full border border-gray-500 overflow-hidden">
          {avatar ? (
            <img
              src={avatar}
              alt="avatar-image"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 text-xs">
              No Avatar
            </div>
          )}
        </div>

        <nav className="mt-8 w-full px-4">
          <ul className="space-y-3">
            <li className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer">Home</li>
            <li className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer">Dashboard</li>
            <li className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer">Your Videos</li>
            <li onClick={() => navigate("/upload")}className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer">Upload</li>
            <li onClick={() => {
              alert("are you sure want to logout");
              localStorage.removeItem('mytoken');
              localStorage.removeItem('userId');
              localStorage.removeItem('CoverImage');
              localStorage.removeItem('Avatar');
              navigate('/login');
            }
            

            } 
            
            className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer">Logout</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="bg-gray-900 min-h-screen p-6 flex-1">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
              onClick={() => navigate(`/watch/${video._id}`, { state: video })}

            >
              {/* Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />

              {/* Video Info */}
              <div className="flex p-3">
                {/* Owner Avatar */}
                <img
                  src={video.owner?.avatar}
                  alt={video.owner?.username}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />

                <div className="flex flex-col">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {video.owner?.username || "Unknown"}
                  </p>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
