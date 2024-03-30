import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import MainPage from "./MainPage";
import LoginForm from "./LoginForm";

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<LoginForm />} />
      <Route path="/MainPage" element={<MainPage />} />
    </Routes>
    </Router>
   
  );
}


export default App;
