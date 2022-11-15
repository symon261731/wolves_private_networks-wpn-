import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCommentLikeThunk } from '../../Redux/actions/commentsActions';

export default function CommentItem({ comment }) {
  const dispatch = useDispatch();
  async function likeHandle() {
    // const commentToThunk = { ...comment };
    const commentToThunk = JSON.parse(JSON.stringify(comment));

    console.log(commentToThunk.Comment.likeStatus);
    commentToThunk.Comment.likeStatus = !commentToThunk.Comment.likeStatus;
    console.log(commentToThunk.Comment.likeStatus);

    // eslint-disable-next-line no-unused-expressions
    commentToThunk.Comment.likeStatus ? commentToThunk.Comment.rating += 1 : commentToThunk.Comment.rating -= 1;
    console.log(commentToThunk);
    dispatch(addCommentLikeThunk(commentToThunk));
  }
  // console.log(comment.Comment);

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
        <p className="user-page__score">5.0★(нет такого в бд)</p>
        {comment?.Comment?.likeStatus ? (
          <button className="btn btn-sm" style={{ height: '30px' }} type="button" onClick={likeHandle}>🐺</button>
        ) : (
          <button className="btn btn-sm" style={{ height: '30px' }} type="button" onClick={likeHandle}>👍</button>
        )}

      </div>

      <p className="user-page__comment">{comment?.Comment?.content}</p>
    </div>
  );
}
