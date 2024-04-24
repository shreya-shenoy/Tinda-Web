// Profile.js
import React from 'react';

function Profile() {
  return (
    <div className="profile">
      {/* Profile picture */}
      <img src="./files/profileicon.png" width={100} height={100} alt="Profile" />
      {/* Bio */}
      <div className="bio">
        <h3>Username</h3>
        <p>Bio: This is a user's bio...</p>
      </div>
    </div>
  );
}

export default Profile;
