import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FormVPN.scss';
import { addServersThunk } from '../../Redux/actions/serversActions';
import { addMyServers } from '../../Redux/actions/myServersActions';

export default function FormVPN() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="form-vpn">
      <div className="form-vpn__container">
        <h2 className="form-vpn__title">Add your VPN</h2>
        <form
          className="form-vpn__form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addServersThunk(Object.fromEntries(new FormData(e.target)), user.id));
            dispatch(addMyServers(Object.fromEntries(new FormData(e.target)), user.id)); // Чтобы сразу добавлялись в массив моих серверов
          }}
        >
          <div className="form-vpn__main-flex">
            <div className="form-vpn__inputs-flex">
              <input placeholder="ip" name="ip" className="form-vpn__input" type="text" />
              {/* добавить поле с ip */}
              <input placeholder="protocol" name="protocol" className="form-vpn__input" type="text" />
              <input placeholder="price" name="price" className="form-vpn__input" type="text" />
              <input placeholder="location" name="location" className="form-vpn__input" type="text" />
            </div>
            <button className="form-vpn__btn" type="submit">confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
}
