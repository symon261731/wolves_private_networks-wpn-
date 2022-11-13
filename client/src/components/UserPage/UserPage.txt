import React from 'react';
import './UserPage.scss';

export default function UserPage() {
  return (
    <div className="user-page">
      <div className="user-page__container">
        <div className="user-page__header">
          <div className="user-page__info">
            <h3 className="user-page__user-name">Hori-san</h3>
            <p className="user-page__user-statistic">238 выполненных заказов</p>
          </div>
          <div className="user-page__picture">
            <img className="user-page__image" src="https://i.pinimg.com/736x/dd/fd/e2/ddfde2afaee1fde6ab364b00fe62fb9a.jpg" alt="404" />
          </div>
        </div>
        <div className="user-page__vpn-page">
          <h3 className="user-page__vpn-title">VPN LIST</h3>
          <ul className="user-page__vpn-list">
            <li className="user-page__vpn-item">
              <div className="user-page__vpn-info">
                <p className="user-page__vpn-country">England</p>
                <p className="user-page__vpn-score">4.7★</p>
              </div>
            </li>
            <li className="user-page__vpn-item">
              <div className="user-page__vpn-info">
                <p className="user-page__vpn-country">Russia</p>
                <p className="user-page__vpn-score">2★</p>
              </div>
            </li>
            <li className="user-page__vpn-item">
              <div className="user-page__vpn-info">
                <p className="user-page__vpn-country">USA</p>
                <p className="user-page__vpn-score">3.2★</p>
              </div>
            </li>
          </ul>
        </div>
        <h3 className="user-page__comment-title">Work rewiew</h3>
        <div className="user-page__comments">
          <div className="user-page__one-comment">
            <div className="user-page__pair">
              <p className="user-page__user">user</p>
              <p className="user-page__score">5.0★</p>
            </div>

            <p className="user-page__comment">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores quo doloribus illo modi dolorem ad consequatur, mollitia ipsa ullam facilis consequuntur ut harum, assumenda optio tempora temporibus? A, quisquam inventore.</p>
          </div>
          <div className="user-page__one-comment">
            <div className="user-page__pair">
              <p className="user-page__user">user</p>
              <p className="user-page__score">4.2★</p>
            </div>
            <p className="user-page__comment">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores quo doloribus illo modi dolorem ad consequatur, mollitia ipsa ullam facilis consequuntur ut harum, assumenda optio tempora temporibus? A, quisquam inventore.</p>
          </div>
          <div className="user-page__one-comment">
            <div className="user-page__pair">
              <p className="user-page__user">user</p>
              <p className="user-page__score">3★</p>
            </div>
            <p className="user-page__comment">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores quo doloribus illo modi dolorem ad consequatur, mollitia ipsa ullam facilis consequuntur ut harum, assumenda optio tempora temporibus? A, quisquam inventore.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
