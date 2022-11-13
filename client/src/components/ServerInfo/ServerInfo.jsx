import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCommentsOfServerThunk } from '../../Redux/actions/commentsActions';
import Card from '../Card/Card';
import CommentItem from '../UserPage/CommentItem';
import ModalServer from './ModalServer';

export default function ServerInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const servers = useSelector((state) => state.servers);
  const server = servers.find((el) => el.id === Number(id));
  useEffect(() => {
    dispatch(setCommentsOfServerThunk(id));
  }, [id]);
  const commentsList = useSelector((state) => state.comments);

  return (
    <div>
      <Card server={server} />
      <div className="user-page__comments">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          АДД
        </button>
        <ModalServer id={Number(id)} />

        {
              commentsList?.map((el) => (<CommentItem key={el.id} comment={el} />))
            }
      </div>
    </div>
  );
}
