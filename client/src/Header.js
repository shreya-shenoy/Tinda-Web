// Header.js
import React from 'react';

function Header() {
  return (
    <div className="header">
      {/* Profile picture */}
      <img src="./files/profileicon.png" width={90} height={90} alt="Profile" />
      {/* Username */}
      <h2>Username</h2>
      {/* Additional info */}
      <div className="additional-info">
        <p>Posts: 10</p>
        <p>Followers: 100</p>
        <p>Following: 50</p>
      </div>
      {/* Edit profile button */}
      <button>Edit Profile</button>
    </div>
  );
}

export default Header;
