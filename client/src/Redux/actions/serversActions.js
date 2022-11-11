import axios from 'axios';

import {
  SET_SERVERS,
  ADD_SERVERS,
} from '../type';

export const setServers = (payload) => ({ type: SET_SERVERS, payload });
export const addServers = (payload) => ({ type: ADD_SERVERS, payload });

export const setServersThunk = (input) => (dispatch) => {
  console.log({ input });
  axios
    .post('/server/filter', { input })
    .then((res) => dispatch(setServers(res.data)))
    .catch(console.log);
};

export const addServersThunk = (input) => (dispatch) => {
  axios
    .post('/servers/server', { input })
    .then((res) => dispatch(addServers(res.data)))
    .catch(console.log);
};
