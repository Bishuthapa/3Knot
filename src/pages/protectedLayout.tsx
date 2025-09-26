import { Outlet ,Navigate } from "react-router-dom";
import Navbar from "./NavBar";


const ProtectedLayout = () => {
    const token = localStorage.getItem("mytoken");

    if(!token){
        return <Navigate to = "/not-valid" replace/>;


    }

    return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-800">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;