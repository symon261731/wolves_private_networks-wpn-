import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCommentLikeThunk } from '../../Redux/actions/commentsActions';

export default function CommentItem({ comment }) {
  const dispatch = useDispatch();
  async function likeHandle() {
    // const commentToThunk = { ...comment };
    const commentToThunk = JSON.parse(JSON.stringify(comment));
    commentToThunk.Comment.likeStatus = !commentToThunk.Comment.likeStatus;
    // eslint-disable-next-line no-unused-expressions
    commentToThunk.Comment.likeStatus ? commentToThunk.Comment.rating += 1 : commentToThunk.Comment.rating -= 1;
    console.log(commentToThunk);
    dispatch(addCommentLikeThunk(commentToThunk));
  }
  // console.log(comment);
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
        {comment?.Comment?.likeStatus ? (
          <div>
            {comment?.Comment?.rating}

            <button className="btn btn-sm" style={{ height: '30px' }} type="button" onClick={likeHandle}>🐺</button>
          </div>
        ) : (
          <div>
            {comment?.Comment?.rating}

            <button className="btn btn-sm" style={{ height: '30px' }} type="button" onClick={likeHandle}>👍</button>
          </div>
        )}

      </div>

      <p className="user-page__comment">{comment?.Comment?.content}</p>
    </div>
  );
}
