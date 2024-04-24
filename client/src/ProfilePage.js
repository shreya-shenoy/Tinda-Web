import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import "./ProfilePage.css"
import Header from './Header';
import Profile from './Profile';
import Posts from './Posts';
import Follow from './Follow';
import EditProfile from './EditProfile';

function ProfilePage() {
    
    
    console.log("HIIII");
    return (
      <div className="App">
      <Header />
      <Profile />
      <Posts />
      <Follow />
      <EditProfile />
    </div>
    );
  }

  export default ProfilePage;