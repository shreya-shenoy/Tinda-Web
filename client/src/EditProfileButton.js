
import React from 'react';
import './EditProfileButton.css'; // Import the CSS file

const EditProfileButton = ({ onClick, buttonText }) => {
    return (
      <button className="edit-profile-button" onClick={onClick}>
        {buttonText}
      </button>
    );
  };
  

export default EditProfileButton;
