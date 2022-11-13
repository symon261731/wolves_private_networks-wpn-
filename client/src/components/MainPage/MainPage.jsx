import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Filter from './Filter';
import List from './List';
import MapYandex from './MapYandex';

import './MainPage.scss';
import { setServersThunk } from '../../Redux/actions/serversActions';

export default function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setServersThunk());
  }, []);

  return (
    <div className="main-page">
      <Filter />
      <div className="main-page__flex">
        <List />
        <MapYandex />
      </div>
    </div>
  );
}
