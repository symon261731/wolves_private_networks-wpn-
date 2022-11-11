import React from 'react';

export default function CommentItem({ comment }) {
  return (
    <div className="user-page__one-comment">
      <div className="user-page__pair">
        <p className="user-page__user">{comment.login}</p>
        <p className="user-page__score">5.0★(нет такого в бд)</p>
      </div>

      <p className="user-page__comment">{comment.comment}</p>
    </div>
  );
}
