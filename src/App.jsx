// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { Button, Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
function App() {
  return(
    <Container maxW="620px">
      <Header /> 
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        {/* we will send this username to a usePpage */}
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
    </Container>
  );
}

export default App;
