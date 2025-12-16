import './index.css'
//import CustomeButton from './components/CustomeButton'
import SignUp from './pages/SignUp.tsx';
import Login from './pages/Login.tsx';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import { Toaster } from "react-hot-toast";
import Home from './pages/Dashboard/Home.tsx';
import YourVideos from './pages/Dashboard/yourVideos.tsx';
import Watch  from './pages/watch.tsx';
import Upload from './pages/Dashboard/Upload.tsx';
import NotValidUser from './pages/NotValidUser.tsx';
import ProtectedLayout from './pages/protectedLayout.tsx';
import NotFound from './pages/NotFound.tsx';
import Tweets from './pages/tweets/Tweets.tsx';
import YourTweets from './pages/tweets/yourTweets.tsx';
function App() {

  
  
  

  return (
    <>
    <Routes>
      {/*Public routes*/}
        <Route path="/" element={< Login/>} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/not-valid' element={<NotValidUser />} />

      {/*Protected routes*/}
      <Route element={<ProtectedLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/YourVideos" element={<YourVideos />} />
        <Route path='/watch/:_id' element={<Watch />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/tweets' element={<Tweets />}/>
        <Route path='/yourTweets' element={<YourTweets />} />
      </Route>

       <Route path="*" element={<NotFound />} />

    </Routes>
    <Toaster position="top-center" reverseOrder={false} />
    </>
    
  );
}

export default App

