import './index.css'
//import CustomeButton from './components/CustomeButton'
import SignUp from './pages/SignUp.tsx';
import Login from './pages/Login.tsx';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import { Toaster } from "react-hot-toast";
import Home from './pages/Dashboard/Home.tsx';


function App() {

  
  
  

  return (
    <>
    <Routes>
        <Route path="/" element={< Login/>} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Home" element={<Home />} />

    </Routes>
    <Toaster position="top-center" reverseOrder={false} />
    </>
    
  );
}

export default App

