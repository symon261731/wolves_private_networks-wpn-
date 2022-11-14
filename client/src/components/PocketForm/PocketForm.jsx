import React, { useState } from 'react';
import './PocketForm.scss';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMoneyPocketThunk } from '../../Redux/actions/pocketAction';

export default function PocketForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  return (
    <div className="pocket-form">
      <div className="pocket-form__box">
        <Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focus} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addMoneyPocketThunk(Object.fromEntries(new FormData(e.target))));
            navigate('/');
          }}
          className="pocket-form__form"
        >
          <input
            type="number"
            name="amount"
            placeholder="Write how many many money you want to get"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pocket-form__input"
            required
          />
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            className="pocket-form__input"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            className="pocket-form__input"
            required
          />
          <input
            type="tel"
            name="expiry"
            placeholder=" MM/YY expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            className="pocket-form__input"
            required
          />
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            className="pocket-form__input"
            required
          />
          <button className="pocket-form__btn" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
