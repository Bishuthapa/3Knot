import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import API from "../services/api";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
    const navigate = useNavigate();


    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarUrl(URL.createObjectURL(file));
        }
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setCoverImage(file);
            setCoverImageUrl(URL.createObjectURL(file));
        }
    };



    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);

        //formData.append("confirmPassword", confirmPassword);
        if (avatar) {
            formData.append("avatar", avatar);
        }
        if (coverImage) {
            formData.append("coverImage", coverImage);
        }
        

       try {
          API.post('/users/register', formData,
             {
                 headers: {
                     'Content-Type': 'multipart/form-data'
                 }
             }
         ).then(response => {
                console.log(response.data);
                alert("User registered successfully!");
                navigate("/login");

            })

             
       } catch (error: any) {
        
       
           
           
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Server Error:', error.response.status, error.response.data);
                    // You could display a user-friendly message based on the status code
                    if (error.response.status === 500) {
                        alert('An unexpected error occurred on the server. Please try again later.');
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                    alert('Could not connect to the server. Please check your internet connection.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error:', error.message);
                    alert('An unexpected error occurred. Please try again.');
                }
            };
            
        }

    

    return (

        <div className="bg-slate-800 text-yellow-50 min-h-screen flex justify-center items-center">
            <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="mb-6 text-center text-3xl font-bold border-b border-green-800 pb-4">Sign Up</h1>
                <form onSubmit={submitHandler}>
                    <div className="space-y-4">
                        <input
                            onChange={(e) => { setFullName(e.target.value) }}
                            id="fullName"
                            name="fullName"
                            placeholder="fullName"
                            required={true}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 bg-slate-800 text-yellow-50"
                        />

                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            id="username"
                            name="username"
                            placeholder="Username"
                            required={true}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 bg-slate-800 text-yellow-50"
                        />

                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            id="email"
                            name="email"
                            placeholder="Email"
                            required={true}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 bg-slate-800 text-yellow-50"
                        />

                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required={true}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 bg-slate-800 text-yellow-50"
                        />

                        <input
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            required={true}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 bg-slate-800 text-yellow-50"
                        />
                        <div className="flex flex-col gap-6">
                            {/* Avatar Upload */}
                            <div className="space-y-2">
                                <label htmlFor="avatar" className="text-sm font-semibold text-green-300">
                                    Profile Avatar
                                </label>
                                <div className="relative flex items-center gap-4">
                                    <label
                                        htmlFor="avatar"
                                        className="cursor-pointer flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium border border-dashed border-green-500 rounded-lg w-32 h-32 transition duration-300"
                                    >
                                        Upload
                                        <input
                                            id="avatar"
                                            name="avatar"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            required
                                        />
                                    </label>

                                    {avatarUrl && (
                                        <img
                                            src={avatarUrl}
                                            alt="Avatar Preview"
                                            className="w-32 h-32 rounded-full object-cover border-2 border-green-500 shadow-md transition-transform hover:scale-105"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Cover Image Upload */}
                            <div className="space-y-2">
                                <label htmlFor="coverImage" className="text-sm font-semibold text-green-300">
                                    Cover Image
                                </label>
                                <div className="relative">
                                    <label
                                        htmlFor="coverImage"
                                        className="block cursor-pointer bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium border border-dashed border-green-500 rounded-md p-4 text-center transition duration-300"
                                    >
                                        Upload Cover Image
                                        <input
                                            id="coverImage"
                                            name="coverImage"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCoverImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </label>

                                    {coverImageUrl && (
                                        <img
                                            src={coverImageUrl}
                                            alt="Cover Preview"
                                            className="mt-4 w-full h-40 object-cover rounded-lg border-2 border-green-500 shadow-md transition-transform hover:scale-105"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="mt-4 bg-green-800 text-white py-2 rounded hover:bg-green-600 w-full">
                            Sign Up
                        </button>

                    </div>
                    <br />
                    <div className="flex justify-center items-center">
                    <Link to="/login">Account Already Exists</Link>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default SignUp;
