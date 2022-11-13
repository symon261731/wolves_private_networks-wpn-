import axios from 'axios';
import { SET_ORDER, ADD_ORDER } from '../type';

export const setOrder = (payload) => ({ type: SET_ORDER, payload });
export const addOrder = (payload) => ({ type: ADD_ORDER, payload });

export const setOrderThunk = () => (dispatch) => axios
  .get('/order/all')
  .then((res) => dispatch(setOrder(res.data)))
  .catch((error) => console.log(error));

export const addOrderThunk = (order, navigate) => (dispatch) => axios
  .post('/order/new', { order })
  .then((res) => dispatch(addOrder(res.data)))
  .then(() => navigate('/orders'))
  .catch((error) => console.log(error));
