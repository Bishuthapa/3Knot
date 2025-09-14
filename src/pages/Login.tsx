import React from "react";
import { useState, useEffect } from "react";
const Login = () => {

    const [isValid, setValid] = useState(false);
  
    return (
        <>
            <div className="bg-slate-800 text-yellow-50 min-h-screen flex justify-center items-center">
                <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="mb-6 text-center text-3xl font-bold border-b border-green-800 pb-4">Login Page</h1>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setValid(true);

                        }}
                    >
                        <input
                            id="username"
                            name="username"
                            placeholder="Email or Username"
                            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 bg-slate-800 text-yellow-50"
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 bg-slate-800 text-yellow-50"
                        />
                        <button
                            type="submit"
                            className="mt-4 bg-green-800 text-yellow-50 py-2 rounded hover:bg-green-700 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;