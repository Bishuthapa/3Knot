const NotValidUser = () => {
    return (
        <>


            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-yellow-50">
                <div className="text-6xl font-bold mb-4 flex items-center justify-center">
                    Protected content
                </div>

                <a
                    href="/"
                    className="bg-green-800 px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Go to Login
                </a>
            </div>
        </>
    )
}


export default NotValidUser;