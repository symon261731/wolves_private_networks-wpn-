import axios from 'axios';
import { LOGOUT, SET_USER } from '../type';

export const setUser = (payload) => ({ type: SET_USER, payload });
export const logout = () => ({ type: LOGOUT });

export const signUpUserThunk = (inputs, navigate) => (dispatch) => {
  axios
    .post('/user/signup', { inputs })
    .then((res) => dispatch(setUser(res.data)))
    .then(() => navigate('/'))
    .catch(console.log);
};

export const loginUserThunk = (inputs, navigate) => (dispatch) => {
  axios
    .post('/user/login', { inputs })
    .then((res) => dispatch(setUser(res.data)))
    .then(() => navigate('/'))
    .catch(console.log);
};

export const logoutUserThunk = (navigate) => (dispatch) => {
  axios
    .get('/user/logout')
    .then(() => dispatch(logout()))
    .then(() => navigate('/'))
    .catch(console.log);
};

export const checkUserThunk = () => (dispatch) => {
  axios.post('/user/check').then((res) => dispatch(setUser(res.data)));
};
