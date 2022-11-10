/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useState } from 'react';
import './PesonalPage.scss';

export default function PersonalPage() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="personal-page">
      <h2 className="personal-page__title">Личный кабинет</h2>
      <ul className="personal-page__link-tab">
        <li
          onClick={() => toggleTab(1)}
          className={toggleState === 1 ? 'personal-page__item active-tab' : 'personal-page__item'}
        >
          1 tab
        </li>
        <li
          onClick={() => toggleTab(2)}
          className={toggleState === 2 ? 'personal-page__item active-tab' : 'personal-page__item'}
        >
          2 tab
        </li>
      </ul>

      <div className="personal-page__tabs">
        <div className={toggleState === 1 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
          <h4 className="personal-page__tab-title">first</h4>
          <p className="personal-page__content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nesciunt quaerat sequi error. Eum quam atque natus saepe inventore? Doloremque cum architecto laudantium doloribus amet. Hic mollitia ullam similique veritatis.
          </p>
        </div>
        <div className={toggleState === 2 ? 'personal-page__one-tab active-content' : 'personal-page__one-tab'}>
          <div className="personal-page__content">
            <h4 className="personal-page__tab-title">second</h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolor optio non, voluptas fuga consequatur quam est quas earum a, distinctio repudiandae. Officia hic quos cupiditate unde provident, voluptatem voluptas?
          </div>
        </div>
      </div>
    </div>
  );
}
