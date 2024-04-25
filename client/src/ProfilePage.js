import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import EditProfileButton from './EditProfileButton'; // Import the EditProfileButton component
import './ProfilePage.css';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  //^variables to manage username and editing mode

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setUsername(searchParams.get("username"));
  }, [location.search]);

// event handler for edit button
  const handleEditButtonClick = () => {
    setIsEditing(true);
    setNewUsername(username);
  };

  //event handler for cancel button
  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewUsername('');
  };

// event handler for save button
  const handleSaveEdit = () => {
    setUsername(newUsername);
    setIsEditing(false);
  };

  //style for spacing and components for
  //the profile pic,followers, matches, and following components
  return (
    <div style={{ maxWidth: "540px", margin: "0 auto" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "20px 0",
        borderBottom: "1px solid grey"
      }}>

        {/* profile pic */}
        <div>
          <img style={{ width: "80px", height: "80px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlcyUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
            alt="Profile" />
        </div>
        <div>

      {/* username section */}
      {/* renders inout if editing, otherwise it does username */}
          {isEditing ? (
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          ) : (
              <h4>{username}</h4>
            )}
          <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
            <h6>40 matches</h6>
            <h6>50 followers</h6>
            <h6>60 following</h6>
          </div>
        </div>
        {isEditing ? (
          <div>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <div className = "editButton" style={{width:"30%"}}>
            <EditProfileButton onClick={handleEditButtonClick} buttonText="Edit Display Name" />
            </div>
          )}
      </div>

      {/* stock images to represent the match data */}
      <div className="gallery">
        <img className="gallery-item" src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlcyUyMGZvb2R8ZW58MHx8MHx8fDA%3D" alt="Gallery Item" />
        <img className="gallery-item" src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlcyUyMGZvb2R8ZW58MHx8MHx8fDA%3D" alt="Gallery Item" />
      </div>
    </div>
  );
};

export default ProfilePage;
