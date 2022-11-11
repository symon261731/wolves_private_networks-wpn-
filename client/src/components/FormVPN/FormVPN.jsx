import React from 'react';
import { useDispatch } from 'react-redux';
import './FormVPN.scss';
import { addServersThunk } from '../../Redux/actions/serversActions';

export default function FormVPN() {
  const dispatch = useDispatch();
  return (
    <div className="form-vpn">
      <div className="form-vpn__container">
        <h2 className="form-vpn__title">Add your VPN</h2>
        <form
          className="form-vpn__form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addServersThunk(Object.fromEntries(new FormData(e.target))));
          }}
        >
          <div className="form-vpn__main-flex">
            <div className="form-vpn__inputs-flex">
              <input placeholder="ip" name="ip" className="form-vpn__input" type="text" />
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
