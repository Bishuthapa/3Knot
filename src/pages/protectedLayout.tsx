import { Outlet ,Navigate } from "react-router-dom";


const ProtectedLayout = () => {
    const token = localStorage.getItem("mytoken");

    if(!token){
        return <Navigate to = "/not-valid" replace/>;


    }

    return <Outlet/>
}

export default ProtectedLayout;