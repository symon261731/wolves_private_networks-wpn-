import axios from 'axios';
import {
  SET_ORDER, ADD_ORDER, SET_ONE_ORDER, GET_NEW_ORDER, REMOVE_FROM_ALL,
} from '../type';

export const setOrder = (payload) => ({ type: SET_ORDER, payload });
export const addOrder = (payload) => ({ type: ADD_ORDER, payload });
export const setOneOrder = (payload) => ({ type: SET_ONE_ORDER, payload });
export const getNewOrder = (payload) => ({ type: GET_NEW_ORDER, payload });
export const removeFromAll = (payload) => ({ type: REMOVE_FROM_ALL, payload });

export const setOrderThunk = () => (dispatch) => axios
  .get('/order/all')
  .then((res) => dispatch(setOrder(res.data)))
  .catch((error) => console.log(error));

export const addOrderThunk = (order, navigate) => (dispatch) => axios
  .post('/order/new', { order })
  .then((res) => dispatch(addOrder(res.data)))
  .then(() => navigate('/orders'))
  .catch((error) => console.log(error));

export const setOneOrderThunk = (orderId) => (dispatch) => axios
  .get(`/order/${orderId}`)
  .then((res) => dispatch(setOneOrder(res.data)))
  .catch(console.log);

export const getNewOrderThunk = (orderId, navigate) => (dispatch) => axios
  .get(`/order/newjob/${orderId}`)
  .then((res) => dispatch(getNewOrder(res.data)))
  .then(navigate('/orders'))
  .catch(console.log);
