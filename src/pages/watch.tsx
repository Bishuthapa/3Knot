import { useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const video = location.state; // this is the object you passed
  console.log(video);

  if (!video) return <p className="text-white">No video found</p>;

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4 flex flex-col lg:flex-row gap-4">
      {/* Video Section */}
      <div className="lg:w-[75%]">
        <video
        controls
        autoPlay
        className="w-full rounded-lg aspect-video"
        src={video.video}
        />
        <div className="mt-4">
        <h1 className="text-white text-2xl font-bold">{video.title}</h1>
        <div className="flex items-center mt-4">
          <img
          className="w-12 h-12 rounded-full"
          src={video.thumbnail}
          alt={video.title}
          />
          <div className="ml-3">
          <p className="text-white font-medium">{video.channel}</p>
          <p className="text-gray-400 text-sm">
            {video.owner.username} 
          </p>
          </div>
        </div>
        <p className="text-gray-400 mt-4 whitespace-pre-wrap">
          {video.description}
        </p>
        </div>
      </div>
      
      {/* Suggestions Section */}
      <div className="lg:w-[25%]">
        {/* Add suggested videos here if needed */}
      </div>
      </div>
    </div>
     
    
  );
};

export default Watch;
