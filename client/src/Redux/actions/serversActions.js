import axios from 'axios';

import {
  SET_SERVERS,
  ADD_SERVERS,
  EDIT_SERVER,
  LOGOUT_SERVER,
} from '../type';

export const setServers = (payload) => ({ type: SET_SERVERS, payload });
export const addServers = (payload) => ({ type: ADD_SERVERS, payload });
export const editServer = (payload) => ({ type: EDIT_SERVER, payload });
export const logoutServer = (payload) => ({ type: LOGOUT_SERVER, payload });

export const setServersThunk = (input) => (dispatch) => {
  axios
    .post('/server/filter', { input })
    .then((res) => dispatch(setServers(res.data)))
    .catch(console.log);
};

export const addServersThunk = (input, id, navigate) => (dispatch) => {
  console.log({ input, id });
  axios
    .post(`/server/new/${id}`, input)
    .then((res) => dispatch(addServers(res.data)))
    .catch(console.log)
    .then(() => navigate('/personalPage/2'));
};

export const setAllServersThunk = () => (dispatch) => {
  axios
    .get('/server/all')
    .then((res) => dispatch(setServers(res.data)))
    .catch(console.log);
};

export const editServersOfUserThunk = (curserver) => (dispatch) => {
  console.log(curserver.subscribeStatus);
  if (!curserver.subscribeStatus) {
    axios
      .delete(`/purchase/unsubscribe/${curserver.id}`)
      .then(() => { dispatch(editServer(curserver)); });
    // .catch(console.log)
    // .then(() => dispatch(setAllServersThunk()));
  } else {
    axios
      .get(`/purchase/new/${curserver.id}`)
      .then(() => dispatch(editServer(curserver)));
    // .catch(console.log)
    // .then(() => dispatch(setAllServersThunk()));
  }
};
