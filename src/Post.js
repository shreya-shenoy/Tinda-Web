// Post.js
import React from 'react';

const Post = ({ image, caption }) => {
  return (
    <div className="post">
      <img src={image} alt="Post" className="post-image" />
      <p className="post-caption">{caption}</p>
    </div>
  );
};

export default Post;
