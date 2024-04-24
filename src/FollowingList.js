// FollowingList.js
import React from 'react';

const FollowingList = ({ following }) => {
  return (
    <div className="following-list">
      <h3>Following</h3>
      <ul>
        {following.map((followee, index) => (
          <li key={index}>{followee}</li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
