import React from 'react';
import './PocketForm.scss';

export default function PocketForm() {
  return (
    <div className="pocket-form">
      <div className="pocket-form__box">
        <form action="" className="pocket-form__main">
          <div className="pocket-form__content">
            <p className="pocket-form__text">payment amount</p>
            <input placeholder="1-1000$" type="text" className="pocket-form__input" />
            <p className="pocket-form__text">name on card</p>
            <input placeholder="Jonh Uvanov" type="text" className="pocket-form__input" />
            <p className="pocket-form__text">card number</p>
            <input placeholder="Your card number" type="text" className="pocket-form__input" />
            <div className="pocket-form__flex-text">
              <p className="pocket-form__text">expire date</p>
              <p className="pocket-form__text">security code</p>
            </div>
            <div className="pocket-form__flex">
              <input placeholder="MM/YY" type="text" className="pocket-form__input input_date" />
              <input placeholder="123" type="number" className="pocket-form__input input_code" />
            </div>
          </div>
          <button type="submit" className="pocket-form__btn">Pay</button>
        </form>
      </div>
    </div>
  );
}
