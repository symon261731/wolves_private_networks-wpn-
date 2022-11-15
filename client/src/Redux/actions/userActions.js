import axios from 'axios';
import { EDIT_USER, LOGOUT, SET_USER } from '../type';

export const setUser = (payload) => ({ type: SET_USER, payload });
export const logout = () => ({ type: LOGOUT });
export const editUser = (payload) => ({ type: EDIT_USER, payload });

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

export const logoutUserThunk = () => (dispatch) => {
  axios
    .get('/user/logout')
    .then(() => dispatch(logout()))
    .catch(console.log);
};

export const checkUserThunk = () => (dispatch) => {
  axios.post('/user/check').then((res) => dispatch(setUser({ ...res.data, loading: false })))
    .catch((err) => {
      dispatch(setUser({ loading: false }));
      console.log(err);
    });
};

// export const findUserThunk = (id) => (dispatch) => {
//   axios
//     .post(`/user/${id}`)
//     .then((res) => dispatch(setUser(res.data)))
//     .catch(console.log);
// };
