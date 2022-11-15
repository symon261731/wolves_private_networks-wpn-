import axios from 'axios';
import { SET_CURRENT_ORDER, DONE_NEW_ORDER } from '../type';

export const setCurrentOrder = (payload) => ({ type: SET_CURRENT_ORDER, payload });
export const doneNewOrder = (payload) => ({ type: DONE_NEW_ORDER, payload });

export const setCurrentOrderThunk = () => (dispatch) => axios
  .get('/order/mywork')
  .then((res) => dispatch(setCurrentOrder(res.data)))
  .catch((error) => console.log(error));

export const doneNewOrderThunk = (orderId) => (dispatch) => axios
  .get(`/order/closejob/${orderId}`)
  .then((res) => dispatch(doneNewOrder(res.data)))
  .catch(console.log);
