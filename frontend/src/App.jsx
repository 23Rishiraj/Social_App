// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { Box, Button, Container } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UpdateProfilePage from "./pages/UpdateProfilePage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
// import LogoutButton from "./components/LogoutButton";
import CreatPost from "./components/CreatPost";
import Chatpage from "./pages/Chatpage";

function App() {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <Box position={"relative"} w={"full"}>

      <Container maxW="620px">
        <Header />
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
          {/* <Route path="/update" element={<UpdateProfilePage />}/>; */}

          <Route path="/:username" element={user ?
            (
              <>
                <UserPage />
                <CreatPost />
              </>
            ) : <UserPage />} />
          {/* we will send this username to a usePpage */}
          <Route path="/:username/posts/:pid" element={<PostPage />} />
          <Route path="/chat" element={user ? <Chatpage /> : <Navigate to="/auth" />} />
        </Routes>
        {/* {user && <LogoutButton />}  */}
        {/* {user && <CreatPost />} */}
        {/* <CreatPost/> */}

      </Container>
    </Box>
  );
}

export default App;
