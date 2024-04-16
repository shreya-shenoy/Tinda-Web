import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import MainPage from "./MainPage";
import LoginForm from "./LoginForm";
import RecipeSearch from "./RecipeSearch";
import Signup from './Signup'
import Login from './Login'
import ProfilePage from "./ProfilePage";


function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Navigate to="/login" />} />
      <Route exact path="/register" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/MainPage" element={<MainPage />} />
      <Route path="/ProfilePage" element={<ProfilePage />} />
    </Routes>
    </Router>
   
  );
}


export default App;
