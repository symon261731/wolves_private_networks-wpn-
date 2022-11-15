import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Spring } from '@react-spring/web';
import { deleteServersOfUserThunk } from '../../../Redux/actions/myServersActions';
import { editServersOfUserThunk } from '../../../Redux/actions/serversActions';
import './OneVpn.scss';

export default function OneVpn({ info, flag }) {
  // export default function OneVpn({ info }) {
  const [configLink, setConfigLink] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  function handleDownload() {
    axios('server/config/:id', { responseType: 'blob' })
      .then((res) => {
        const href = URL.createObjectURL(res.data);
        const download = 'config.ovpn';
        setConfigLink({ href, download });
        console.log({ res });
      });
  }

  const handlerUnsubscr = async (server) => {
    const serv = { ...server };
    serv.subscribeStatus = !serv.subscribeStatus;
    if (user.pocket >= server.price) {
      dispatch(editServersOfUserThunk(serv));
    }
  };

  const deleteHandler = async (server) => {
    dispatch(deleteServersOfUserThunk(server));
  };

  return (
    <div className="one-vpn">
      <div className="one-vpn__box">
        {!flag
        && <button onClick={() => deleteHandler(info)} className="one-vpn__delete-btn" type="button">X</button>}
        <p className="one-vpn__content">
          <span className="one-vpn__span">location:</span>
          {info?.location}
        </p>
        <p className="one-vpn__content">
          <span className="one-vpn__span">protocol:</span>
          {info?.protocol}
        </p>
        <p className="one-vpn__content">
          <span className="one-vpn__span">IP:</span>
          {info?.ip}
        </p>
        <p className="one-vpn__score">
          <span className="one-vpn__span">Subscribers:</span>
          {info?.subscribedUsers?.length}
        </p>
        <Link to={`/server/${info.id}`}>MORE INFO</Link>
        <div className="one-vpn__flex">
          <button onClick={handleDownload} type="button" className="one-vpn__btn" to="/">Get config</button>
          {flag
        && <button onClick={() => handlerUnsubscr(info)} type="button" className="one-vpn__btn one-vpn_unsubscribe">Unsubscribe</button>}

          {configLink?.href ? (
            <a className="one-vpn__download" href={`${configLink?.href}`} download="config.ovpn">download config</a>
          ) : (null)}
        </div>
      </div>

    </div>
  );
}
