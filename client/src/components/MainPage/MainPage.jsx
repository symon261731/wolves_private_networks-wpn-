import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './Filter';
import List from './List';
import MapYandex from './MapYandex';

import './MainPage.css';
import { setServersThunk } from '../../Redux/actions/serversActions';

export default function MainPage() {
  const servers = useSelector((state) => state.servers);

  console.log({ servers });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setServersThunk());
  }, []);

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
