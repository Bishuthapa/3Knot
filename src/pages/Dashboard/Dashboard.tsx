const Dashboard = () => {
  const avatar = localStorage.getItem("Avatar");

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
            <li className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer">Profile</li>
            <li className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer">Settings</li>
            <li className="text-white hover:bg-slate-600 p-2 rounded cursor-pointer">Logout</li>
          </ul>
        </nav>
      </div>

      
      <div className="dashboard-content flex-1 bg-slate-900 p-6 text-white overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-300">Here’s where your main content will go.</p>
      </div>
    </div>
  );
};

export default Dashboard;
