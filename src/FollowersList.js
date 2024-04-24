// FollowersList.js
import React from 'react';

const FollowersList = ({ followers }) => {
  return (
    <div className="followers-list">
      <h3>Followers</h3>
      <ul>
        {followers.map((follower, index) => (
          <li key={index}>{follower}</li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
