import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FormVPN.scss';
import { useNavigate } from 'react-router-dom';
import { addServersThunk } from '../../Redux/actions/serversActions';
import { addMyServers } from '../../Redux/actions/myServersActions';

export default function FormVPN() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="form-vpn">
      <div className="form-vpn__container">
        <h2 className="form-vpn__title">Add your VPN</h2>
        <form
          className="form-vpn__form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addServersThunk(Object.fromEntries(new FormData(e.target)), user.id, navigate));
            dispatch(addMyServers(Object.fromEntries(new FormData(e.target)), user.id)); // Чтобы сразу добавлялись в массив моих серверов
          }}
        >
          <div className="form-vpn__main-flex">
            <div className="form-vpn__inputs-flex">
              <input placeholder="ip" name="ip" className="form-vpn__input " type="text" required />
              {/* <input placeholder="protocol" name="protocol" className="form-vpn__input" type="text" /> */}
              <select className="form-vpn__input form-vpn__select" name="protocol" required>
                <option className="form-vpn__option" value="OpenVPN">OpenVPN</option>
                <option className="form-vpn__option" value="WireGuard" selected>WireGuard</option>
                <option className="form-vpn__option" value="L2TP/IPsec">L2TP/IPsec</option>
              </select>
              <input placeholder="price" name="price" className="form-vpn__input" type="text" required />
              <input placeholder="location" name="location" className="form-vpn__input" type="text" required />

            </div>
            <button className="form-vpn__btn" type="submit">confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
}
