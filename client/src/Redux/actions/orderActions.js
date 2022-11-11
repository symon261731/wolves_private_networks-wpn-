import axios from 'axios';
import { SET_ORDER, ADD_ORDER } from '../type';

export const setOrder = (payload) => ({ type: SET_ORDER, payload });
export const addOrder = (payload) => ({ type: ADD_ORDER, payload });

const serverHost = process.env.REACT_APP_SERVERHOST;

export const setOrderThunk = () => (dispatch) => axios
  .get(`${serverHost}/api/order/all`)
  .then((res) => dispatch(setOrder(res.data)))
  .catch((error) => console.log(error));

export const addOrderThunk = (order) => (dispatch) => axios
  .post(`${serverHost}/api/order/new`, { order })
  .then((res) => dispatch(addOrder(res.data)))
  .catch((error) => console.log(error));
