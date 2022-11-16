import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCommentsOfServerThunk } from '../../Redux/actions/commentsActions';
import Card from '../Card/Card';
import CommentItem from '../UserPage/CommentItem';
import ModalServer from './ModalServer';
import './ServerInfo.scss';

export default function ServerInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // const servers = useSelector((state) => state.servers);

  const [server, setServer] = useState({});
  // console.log(servers);
  // const server = servers.find((el) => el.id === Number(id));

  useEffect(() => {
    axios
      .get(`/server/${id}`)
      .then((res) => {
        setServer(res.data);
      })
      .then(() => dispatch(setCommentsOfServerThunk(id)));
  }, []);
  const commentsList = useSelector((state) => state.comments);
  console.log(server);
  return (
    <div className="server-info">
      <Card server={server} setServer={setServer} />
      <button type="button" className="server-info__add-btn server-info__add-btn_margin-top" data-bs-toggle="modal" data-bs-target="#exampleModal">
        add comment
      </button>
      <div className="user-page__comments">

        <ModalServer id={Number(id)} />

        {
              commentsList?.map((el) => (<CommentItem key={el.id} comment={el} />))
            }
      </div>
    </div>
  );
}
