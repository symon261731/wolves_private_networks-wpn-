import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrderThunk } from '../../Redux/actions/orderActions';

export default function FormOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="form-vpn">
      <div className="form-vpn__container">
        <h2 className="form-vpn__title">Add new order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addOrderThunk(Object.fromEntries(new FormData(e.target)), navigate));
          }}
          className="form-vpn__form"
        >
          <div className="form-vpn__main-flex">
            <div className="form-vpn__inputs-flex">
              <input placeholder="please describe your order" name="title" className="form-vpn__input" type="text" />
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
