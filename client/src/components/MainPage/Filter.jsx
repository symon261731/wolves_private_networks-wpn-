/* eslint-disable no-unused-expressions */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setServersThunk } from '../../Redux/actions/serversActions';
import './Filter.scss';

export default function Filter() {
  const [ratingValue, setRatingValue] = useState('0');

  function handleChange(e) {
    setRatingValue(e.target.value);
  }

  const [maxRating, setMaxRating] = useState(1000000);

  useEffect(() => {
    axios.get('/server/max-rate')
      .then((res) => setMaxRating(res.data));
  });

  const dispatch = useDispatch();
  function submitHandle(e) {
    e.preventDefault();
    const options = Object.fromEntries(new FormData(e.target));
    options.protocol = [];
    console.log({ options });

    options.OpenVPN ? options.protocol.push(options.OpenVPN) : null;
    options.WireGuard ? options.protocol.push(options.WireGuard) : null;
    options['L2TP/IPsec'] ? options.protocol.push(options['L2TP/IPsec']) : null;
    options.protocol?.length === 0 ? options.protocol = ['WireGuard', 'OpenVPN', 'L2TP/IPsec'] : (null);
    options.from?.length === 0 ? options.from = 0 : options.from;
    options.to?.length === 0 ? options.to = 1000000000 : options.to;
    options.ratingValue?.length === 0 ? options.ratingValue = 0 : options.ratingValue;

    // console.log({ options });
    dispatch(setServersThunk(options));
  }

  return (
    <div className="filter">
      <h5 className="main-page__title">Filters</h5>
      <form onSubmit={submitHandle}>
        <div className="filter__flex-radio">
          <p className="filter__label">Choose you protocol</p>
          <div className="form-check form-check-inline">
            <input name="OpenVPN" className="form-check-input" type="checkbox" id="inlineCheckbox1" value="OpenVPN" />
            <label className="form-check-label" htmlFor="inlineCheckbox1">OpenVPN</label>
          </div>
          <div className="form-check form-check-inline">
            <input name="WireGuard" className="form-check-input" type="checkbox" id="inlineCheckbox2" value="WireGuard" />
            <label className="form-check-label" htmlFor="inlineCheckbox2">WireGuard</label>
          </div>
          <div className="form-check form-check-inline">
            <input name="L2TP/IPsec" className="form-check-input" type="checkbox" id="inlineCheckbox3" value="L2TP/IPsec" />
            <label className="form-check-label" htmlFor="inlineCheckbox3">L2TP/IPsec</label>
          </div>
        </div>
        <div className="filter_item">
          <div className="mb-3">
            <p className="filter__label">Location</p>
            <input name="location" type="text" className="filter__input" id="formGroupExampleInput" placeholder="input loacation" />
          </div>
          <div className="mb-3">
            <p className="filter__label">Owner name/company</p>
            <input className="filter__input" name="ownerName" type="text" id="formGroupExampleInput2" placeholder="input name or company" />
          </div>
        </div>
        <div className="filter_item">
          <div className="mb-3">
            <p className="filter__label">Price USD/Month</p>
            <div className="filter__flex">
              <input name="from" type="number" className="filter__price" placeholder="from" />
              <input name="to" type="number" className="filter__price" placeholder="to" />
            </div>
          </div>
        </div>
        <div className="filter_item">
          <div className="mb-3">
            <p className="filter__label">Rating From</p>
            <input name="ratingValue" type="range" value={ratingValue} min="1" max={maxRating} onChange={handleChange} />
            <output>{ratingValue}</output>
          </div>
        </div>
        <button className="filter__btn" type="submit">Search</button>
      </form>
    </div>
  );
}
