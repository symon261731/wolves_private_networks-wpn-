import React, { useState } from 'react';
import './PocketForm.scss';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default function PocketForm() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  return (
    // <div className="pocket-form">
    //   <div className="pocket-form__box">
    //     <form action="" className="pocket-form__main">
    //       <div className="pocket-form__content">
    //         <p className="pocket-form__text">payment amount</p>
    //         <input placeholder="1-1000$" type="text" className="pocket-form__input" />
    //         <p className="pocket-form__text">name on card</p>
    //         <input placeholder="Jonh Uvanov" type="text" className="pocket-form__input" />
    //         <p className="pocket-form__text">card number</p>
    //         <input placeholder="Your card number" type="text" className="pocket-form__input" />
    //         <div className="pocket-form__flex-text">
    //           <p className="pocket-form__text">expire date</p>
    //           <p className="pocket-form__text">security code</p>
    //         </div>
    //         <div className="pocket-form__flex">
    //           <input placeholder="MM/YY" type="text" className="pocket-form__input input_date" />
    //           <input placeholder="123" type="number" className="pocket-form__input input_code" />
    //         </div>
    //       </div>
    //       <button type="submit" className="pocket-form__btn">Pay</button>
    //     </form>
    //   </div>
    // </div>
    <div className="pocket-form">
      <div className="pocket-form__box">
        <Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focus} />
        <form className="pocket-form__form" action="">
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            className="pocket-form__input"
          />
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            className="pocket-form__input"
          />
          <input
            type="tel"
            name="expiry"
            placeholder=" MM/YY expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            className="pocket-form__input"
          />
          <input
            type="tel"
            name="number"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            className="pocket-form__input"
          />
          <button className="pocket-form__btn" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
