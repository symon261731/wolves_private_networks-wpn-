import React from 'react';

export default function Filter() {
  return (
    <div className="filter_conteiner">
      <h5>Filters</h5>

      <div className="filter_item">
        <label className="form-check-label">Protocol</label>
        <br />
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
          <label className="form-check-label" htmlFor="inlineCheckbox1">OpenVPN</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
          <label className="form-check-label" htmlFor="inlineCheckbox2">WireGuard</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
          <label className="form-check-label" htmlFor="inlineCheckbox3">L2TP/IPsec  </label>
        </div>
      </div>
      <div className="filter_item">
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Location</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="input loacation" />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">Owner name/company</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="input name or company" />
        </div>
      </div>
    </div>
  );
}
