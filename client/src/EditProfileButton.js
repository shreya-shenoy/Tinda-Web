// EditProfileButton.js
import React from 'react';
import './EditProfileButton.css'; // Import the CSS file

const EditProfileButton = ({ onClick, buttonText }) => {
    return (
      <button className="edit-profile-button" onClick={onClick}>
        {buttonText}
      </button>
    );
  };
  

// const EditProfileButton = () => {
//   return (
//     <button className="edit-profile-button">Edit Profile</button>
//   );
// };

export default EditProfileButton;
