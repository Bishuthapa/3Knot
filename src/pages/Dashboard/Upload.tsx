import { useState } from "react"
import API from "../../services/api";
import toast from "react-hot-toast";

const Upload  = () => {

const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [thumbnail, setThumbnail] = useState<File | null>(null);
const [video, setVideo] = useState<File | null>(null);


const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
        setVideo(file);
    }
};

const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];    
    if (file) {
        setThumbnail(file);
    }
}



const submithHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    if(video)
    {
    formData.append("video", video!);
    }

    if(thumbnail)
    {
    formData.append("thumbnail", thumbnail!);
    }



try {

    API.post('/videos', formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    ).then(response => {
        console.log(response.data);
        toast.success("Video uploaded successfully");
    })


    
} catch (error) {

    console.log(error);
    
}
}


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Upload Video
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={submithHandler}>
                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Title"
                    />
                </div>
                <div>
                    <input
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Description"
                    />
                </div>
                <div className="flex flex-col space-y-2 p-2 border border-gray-300">
                    <label className="text-sm font-medium text-gray-700">Video</label>
                    <input
                    onChange={handleVideo}
                    type="file"
                    required
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                </div>
                <div className="flex flex-col space-y-2 p-2 border border-gray-300">
                    <label className="text-sm font-medium text-gray-700">Thumbnail</label>
                    <input
                    onChange={handleThumbnail}
                    type="file"
                    required
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Upload
                </button>
                </div>
            </form>
            </div>
        </div>
    )
}


export default Upload