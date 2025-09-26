import { useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const video = location.state; // this is the object you passed

  if (!video) return <p className="text-white">No video found</p>;

  return (
    <div className="bg-gray-900 h-screen display flex">
      <div className="w-full flex flex-col content-center">
      <video
        controls
        autoPlay
        className="w-3/4 max-h-[80vh] rounded-lg"
        src={video.video}
      />
      <h2 className="text-white text-xl">{video.title}</h2>
      <p className="text-gray-400">{video.description}</p>
    </div>
    <div>

    </div>
    </div>
  );
};

export default Watch;
