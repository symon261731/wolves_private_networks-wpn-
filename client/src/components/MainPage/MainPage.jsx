import React from 'react';
import Filter from './Filter';
import List from './List';
import MapYandex from './MapYandex';

import './MainPage.css';

export default function MainPage() {
  return (
    <div className="conteiner">
      <div className="item">
        <h5>Filters</h5>
        <Filter />
      </div>
      <div className="item">
        <h5>List</h5>
        <List className="item" />
      </div>
      <div className="item">
        <MapYandex className="item" />
      </div>
    </div>
  );
}
