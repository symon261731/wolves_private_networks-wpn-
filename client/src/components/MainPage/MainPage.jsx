import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './Filter';
import List from './List';
import MapYandex from './MapYandex';

import './MainPage.scss';
import { setServersThunk } from '../../Redux/actions/serversActions';

export default function MainPage() {
  const servers = useSelector((state) => state.servers);

  console.log({ servers });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setServersThunk());
  }, []);

  return (
    <div className="main-page">
      <div className="main-page__item filter">
        <Filter />
      </div>
      <div className="main-page__item">
        <h5 className="main-page__title">List</h5>
        <List className="item" />
      </div>
      <div className="item">
        <MapYandex className="item" />
      </div>
    </div>
  );
}
