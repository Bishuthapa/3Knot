import './index.css'
//import CustomeButton from './components/CustomeButton'
import RegisterForm from './components/RegisterForm.tsx';
import LoginForm from './components/LoginForm.tsx';
import { Routes, Route } from 'react-router-dom';


function App() {
  
  
  

  return (
    <>
    <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/about" element={<LoginForm />} />
    </Routes>
    </>
    
  );
}

export default App
