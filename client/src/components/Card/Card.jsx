/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { payMoneyPocket } from '../../Redux/actions/pocketAction';
import { addServersLikeThunk, editServersOfUserThunk } from '../../Redux/actions/serversActions';
import './Card.scss';

export default function Card({ server, setServer }) {
  console.log({ server });

  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();

  async function likeHandle() {
    const serv = { ...server };
    serv.likeStatus = !serv.likeStatus;
    if (id) setServer(serv);
    // eslint-disable-next-line no-unused-expressions
    serv?.likeStatus ? serv.rating += 1 : serv.rating -= 1;
    dispatch(addServersLikeThunk(serv));
  }

  const handlerUnsubscr = async () => {
    const serv = { ...server };
    serv.subscribeStatus = !serv.subscribeStatus;
    if (id) setServer(serv);
    if (user.pocket >= server?.price) {
      dispatch(editServersOfUserThunk(serv));
      if (serv.subscribeStatus) {
        dispatch(payMoneyPocket(server?.price));
      }
    }
  };

  return (

    <div className="card">
      <div className="card__body">

        <p className="card__item">
          Username:
          {' '}
          <Link to={`/userHori/${server?.User?.id}`}>{server?.User?.login || 'ololoshka'}</Link>
        </p>

        <p className="card__item">
          Protocol:
          {' '}
          {server?.protocol}
        </p>
        <p className="card__item">
          IP:
          {' '}
          {server?.ip}
        </p>
        <div className="card__flex">
          <p className="card__item">
            Location:
            {' '}
            {server?.location}
          </p>
          <p className="card__item card__price">
            Price:
            {' '}
            {server?.price}
          </p>
        </div>
        <div className="card__flex">
          <p className="card__item">
            Rating:
            {' '}
            {server?.rating}
          </p>
          {server?.likeStatus ? (
            <button className="btn btn-sm" style={{ height: '30px' }} type="button" onClick={likeHandle}>🐺</button>
          ) : (
            <button className="btn btn-sm" style={{ height: '30px' }} type="button" onClick={likeHandle}>👍</button>
          )}
        </div>
        <p className="card__item">
          Subscribers:
          {' '}
          {server?.subscribedUsers?.length}
        </p>
        {/* когда с бека придет инфо о том был ли лайк будет меняться иконка */}
        {/* <div>☝</div> */}

      </div>
      <div className="card__buttons">
        <Link key={server?.id} to={`/server/${server?.id}`}>
          {!id
                    && <button className="card__btn-info" type="button">Info</button>}
        </Link>
        {!server?.subscribeStatus ? <button className="card__btn-sub" type="button" onClick={() => handlerUnsubscr()}>Subscribe</button>
          : ((user.pocket >= server?.price) ? <button type="button" className="card__btn-sub unsub_btn" onClick={() => handlerUnsubscr()}>Unsubscribe</button>
            : <div>No enougth money</div>)}

      </div>

    </div>
  );
}
