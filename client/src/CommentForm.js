// CommentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/comments', { text: commentText });
      onCommentSubmit(); // Update comment list after submitting
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment here..."
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
