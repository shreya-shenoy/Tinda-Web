// ProfileHeader.js
import React from 'react';

const ProfileHeader = ({ profilePicture, username, bio, followersCount, followingCount }) => {
  return (
    <div className="profile-header">
      <div className="profile-info">
        <div className="profile-picture-container">
          <img src={profilePicture} alt="Profile" className="profile-picture" />
        </div>
        <div className="user-details">
          <h2>{username}</h2>
          <p>{bio}</p>
          <div className="counts">
            <span>{followersCount} Followers</span>
            <span>{followingCount} Following</span>
          </div>
          <button className="edit-profile-button">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
