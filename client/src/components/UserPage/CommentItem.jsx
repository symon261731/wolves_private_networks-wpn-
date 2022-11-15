import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCommentLikeThunk } from '../../Redux/actions/commentsActions';

export default function CommentItem({ comment }) {
  const dispatch = useDispatch();

  async function likeHandle() {
    const commentToThunk = { ...comment };
    commentToThunk.likeStatus = !commentToThunk.likeStatus;
    // eslint-disable-next-line no-unused-expressions
    commentToThunk?.likeStatus ? commentToThunk.rating += 1 : commentToThunk.rating -= 1;
    dispatch(addCommentLikeThunk(commentToThunk));
  }
  console.log(comment);
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
        {comment?.likeStatus ? (
          <button className="btn btn-sm" style={{ height: '30px' }} type="button" onClick={likeHandle}>🐺</button>
        ) : (
          <button className="btn btn-sm" style={{ height: '30px' }} type="button" onClick={likeHandle}>👍</button>
        )}

      </div>

      <p className="user-page__comment">{comment?.Comment?.content}</p>
    </div>
  );
}
