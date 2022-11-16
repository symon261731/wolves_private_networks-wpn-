import React, { useState } from 'react';
import './PocketForm.scss';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMoneyPocketThunk } from '../../Redux/actions/pocketAction';
import { editUser } from '../../Redux/actions/userActions';
import AnimatedPage from '../AnimateRoute/AnimatedRoute';

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
    <AnimatedPage>
      <div className="pocket-form">
        <div className="waveWrapper waveAnimation">
          <div className="waveWrapperInner bgTop">
            <div className="wave waveTop" style={{ 'background-image': "url('http://front-end-noobs.com/jecko/img/wave-top.png')" }} />
          </div>
          <div className="waveWrapperInner bgMiddle">
            <div className="wave waveMiddle" style={{ 'background-image': "url('http://front-end-noobs.com/jecko/img/wave-mid.png')" }} />
          </div>
          <div className="waveWrapperInner bgBottom">
            <div className="wave waveBottom" style={{ 'background-image': "url('http://front-end-noobs.com/jecko/img/wave-bot.png')" }} />
          </div>
        </div>
        <div className="pocket-form__box">
          <Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focus} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(addMoneyPocketThunk(Object.fromEntries(new FormData(e.target))));
              dispatch(editUser(Object.fromEntries(new FormData(e.target))));
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
              placeholder=" MMYY expire"
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
    </AnimatedPage>
  );
}
