import React, { useState } from 'react';
import EditProfileButton from './EditProfileButton'; // Import the EditProfileButton component

const ProfilePage = () => {
  const [username, setUsername] = useState('Jane Doe');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setNewUsername(username);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    setUsername(newUsername);
    setIsEditing(false);
  };

  return (
    <div style={{maxWidth:"540px", margin: "0 auto"}}>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "18px 0",
        borderBottom: "1px solid grey"
      }}>
        <div>
          <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlcyUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
            alt="Profile" />
        </div>
        <div>
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
          <EditProfileButton onClick={handleEditButtonClick} buttonText="Edit Display Name"/>
        )}
      </div>

      <div className="gallery">
        <img className="gallery-item" src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlcyUyMGZvb2R8ZW58MHx8MHx8fDA%3D" alt="Gallery Item" />
        <img className="gallery-item" src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlcyUyMGZvb2R8ZW58MHx8MHx8fDA%3D" alt="Gallery Item" />
      </div>
    </div>
  );
};

export default ProfilePage;
