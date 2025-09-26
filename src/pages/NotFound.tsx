// src/pages/NotFound.tsx
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-yellow-50">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <a
        href="/"
        className="bg-green-800 px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Go to Login
      </a>
    </div>
  );
};

export default NotFound;
