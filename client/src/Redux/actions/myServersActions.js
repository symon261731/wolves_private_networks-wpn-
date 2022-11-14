import axios from 'axios';

import {
  SET_MY_SERVERS,
  ADD_MY_SERVERS,
} from '../type';

export const setMyServers = (payload) => ({ type: SET_MY_SERVERS, payload });
export const addMyServers = (payload) => ({ type: ADD_MY_SERVERS, payload });

export const setServersOfUserThunk = (id) => (dispatch) => {
  console.log(id);
  axios
    .get(`/server/user/${id}`)
    .then((res) => dispatch(setMyServers(res.data)))
    .catch(console.log);
};
