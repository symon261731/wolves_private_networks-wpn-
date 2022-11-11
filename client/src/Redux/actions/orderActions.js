import axios from 'axios';
import {
  SET_ORDER, ADD_ORDER, SET_CURRENT_ORDER, SET_ISSUED_ORDER,
} from '../type';

export const setOrder = (payload) => ({ type: SET_ORDER, payload });
export const addOrder = (payload) => ({ type: ADD_ORDER, payload });
export const setCurrentOrder = (payload) => ({ type: SET_CURRENT_ORDER, payload });
export const setIssuedOrder = (payload) => ({ type: SET_ISSUED_ORDER, payload });
// const serverHost = process.env.REACT_APP_SERVERHOST;

export const setOrderThunk = () => (dispatch) => axios
  .get('/order/all')
  .then((res) => dispatch(setOrder(res.data)))
  .catch((error) => console.log(error));

export const addOrderThunk = (order, navigate) => (dispatch) => axios
  .post('/order/new', { order })
  .then((res) => dispatch(addOrder(res.data)))
  .then(() => navigate('/orders'))
  .catch((error) => console.log(error));

export const setCurrentOrderThunk = () => (dispatch) => axios
  .get('/order/mywork')
  .then((res) => dispatch(setCurrentOrder(res.data)))
  .catch((error) => console.log(error));

export const setIssuedOrderThunk = () => (dispatch) => axios
  .get('/order/myorders')
  .then((res) => dispatch(setIssuedOrder(res.data)))
  .catch((error) => console.log(error));
