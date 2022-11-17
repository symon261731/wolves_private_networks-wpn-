import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrderThunk } from '../../Redux/actions/orderActions';
import AnimatedPage from '../AnimateRoute/AnimatedRoute';

export default function FormOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <AnimatedPage>
      <div className="form-vpn">
        <div className="form-vpn__container" style={{ maxWidth: '739px' }}>
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
                <select className="form-vpn__input form-vpn__select" name="protocol" required>
                  <option className="form-vpn__option" value="OpenVPN">OpenVPN</option>
                  <option className="form-vpn__option" value="WireGuard" selected>WireGuard</option>
                  <option className="form-vpn__option" value="L2TP/IPsec">L2TP/IPsec</option>
                </select>
                <input placeholder="price" name="price" className="form-vpn__input" type="text" />
                <input placeholder="location" name="location" className="form-vpn__input" type="text" />
              </div>
              <button className="form-vpn__btn" type="submit">confirm</button>
            </div>
          </form>
        </div>
      </div>
    </AnimatedPage>
  );
}
