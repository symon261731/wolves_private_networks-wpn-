import React, { useEffect, useState } from 'react';
import './UserPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setServersOfUserThunk } from '../../Redux/actions/myServersActions';
import VpnItem from './VpnItem';
import { setCommentsOfUserThunk } from '../../Redux/actions/commentsActions';
import CommentItem from './CommentItem';
import Modal from './Modal';

export default function UserPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  // const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`/user/${id}`)
      .then((res) => { setUser(res.data); });
  }, [id]);

  useEffect(() => {
    // console.log(id);

    dispatch(setServersOfUserThunk(id));
    dispatch(setCommentsOfUserThunk(id));
  }, [id]);

  // useEffect(() => {
  //   dispatch(setCommentsOfUserThunk(id));
  // }, []);

  const vpnList = useSelector((state) => state.servers);
  const commentsList = useSelector((state) => state.comments);

  return (
    <div className="user-page">
      <div className="user-page__container">
        <div className="user-page__header">
          <div className="user-page__info">
            <h3 className="user-page__user-name">
              {user?.login}
            </h3>
            <p className="user-page__user-statistic">238000 выполненных заказов</p>
          </div>
          <div className="user-page__picture">
            <img className="user-page__image" src="https://i.pinimg.com/736x/dd/fd/e2/ddfde2afaee1fde6ab364b00fe62fb9a.jpg" alt="404" />
          </div>
        </div>
        <div className="user-page__vpn-page">
          <h3 className="user-page__vpn-title">VPN LIST</h3>
          <ul className="user-page__vpn-list">
            {
              vpnList?.map((el) => (<VpnItem key={el.id} vpn={el} />))
            }
          </ul>
        </div>
        <h3 className="user-page__comment-title">Work rewiew</h3>

        <div className="user-page__comments">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            АДД
          </button>
          <Modal id={user.id} />

          {
              commentsList?.map((el) => (<CommentItem key={el.id} comment={el} />))
            }
        </div>
      </div>
    </div>
  );
}
