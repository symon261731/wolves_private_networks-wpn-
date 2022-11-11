/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setServersThunk } from '../../Redux/actions/serversActions';

export default function Filter() {
  const [ratingValue, setRatingValue] = useState('0');

  function handleChange(e) {
    setRatingValue(e.target.value);
    console.log(1);
  }

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

    console.log({ options });
    dispatch(setServersThunk(options));
  }

  return (
    <div className="filter_conteiner">
      <form onSubmit={submitHandle}>
        <div className="filter_item">
          <label className="form-check-label">Protocol</label>
          <br />
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
            <label htmlFor="formGroupExampleInput" className="form-label">Location</label>
            <input name="location" type="text" className="form-control" id="formGroupExampleInput" placeholder="input loacation" />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Owner name/company</label>
            <input name="ownerName" type="text" className="form-control" id="formGroupExampleInput2" placeholder="input name or company" />
          </div>
        </div>
        <div className="filter_item">
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Price USD/Month</label>
            <input name="from" type="number" className="form-control price" placeholder="from" />
            <input name="to" type="number" className="form-control price" placeholder="to" />
          </div>
        </div>
        <div className="filter_item">
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Rating From</label>
            <input name="ratingValue" type="range" value={ratingValue} min="1" max="100" onChange={handleChange} />
            <output>{ratingValue}</output>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Search</button>
      </form>
    </div>
  );
}
