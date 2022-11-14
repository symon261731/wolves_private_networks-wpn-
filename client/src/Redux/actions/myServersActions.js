import axios from 'axios';

import {
  SET_MY_SERVERS,
  ADD_MY_SERVERS,
  DELETE_MY_SERVER,
} from '../type';

export const setMyServers = (payload) => ({ type: SET_MY_SERVERS, payload });
export const addMyServers = (payload) => ({ type: ADD_MY_SERVERS, payload });
export const deleteMyServer = (payload) => ({ type: DELETE_MY_SERVER, payload });

export const setServersOfUserThunk = (id) => (dispatch) => {
  axios
    .get(`/server/user/${id}`)
    .then((res) => dispatch(setMyServers(res.data)))
    .catch(console.log);
};

export const deleteServersOfUserThunk = (server) => (dispatch) => {
  axios
    .delete(`/server/${server.id}`)
    .then(() => dispatch(deleteMyServer(server)))
    .catch(console.log);
};
