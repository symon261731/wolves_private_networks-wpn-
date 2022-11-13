import React from 'react';
import { Link } from 'react-router-dom';

export default function CommentItem({ comment }) {
  return (
    <div className="user-page__one-comment">
      <div className="user-page__pair">
        <p className="user-page__user">
          <Link to={`/userHori/${comment?.Comment?.User?.id}`}>
            {' '}
            {comment?.Comment?.User?.login}
            {' '}
          </Link>
        </p>
        <p className="user-page__score">5.0★(нет такого в бд)</p>
      </div>

      <p className="user-page__comment">{comment?.Comment?.content}</p>
    </div>
  );
}
