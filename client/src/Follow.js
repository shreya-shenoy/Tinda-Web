// Follow.js
import React from 'react';

function Follow() {
  return (
    <div className="follow">
      {/* Followers/Following section */}
      <div>
        <h4>Followers</h4>
        {/* List of followers */}
        <ul>
          <li>Follower 1</li>
          <li>Follower 2</li>
          {/* Add more followers */}
        </ul>
      </div>
      <div>
        <h4>Following</h4>
        {/* List of following */}
        <ul>
          <li>Following 1</li>
          <li>Following 2</li>
          {/* Add more following */}
        </ul>
      </div>
    </div>
  );
}

export default Follow;
