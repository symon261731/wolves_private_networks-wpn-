import axios from 'axios';
import { SET_ISSUED_ORDER, DONE_ISSUED_ORDER } from '../type';

export const setIssuedOrder = (payload) => ({ type: SET_ISSUED_ORDER, payload });
export const doneIssuedOrder = (payload) => ({ type: DONE_ISSUED_ORDER, payload });

// const serverHost = process.env.REACT_APP_SERVERHOST;

export const setIssuedOrderThunk = () => (dispatch) => axios
  .get('/order/myorders')
  .then((res) => dispatch(setIssuedOrder(res.data)))
  .catch((error) => console.log(error));

export const doneIssuedOrderThunk = (orderId) => (dispatch) => {
  axios
    .get(`/order/closejob/${orderId}`)
    .then((res) => dispatch(doneIssuedOrder(res.data)))
    .catch(console.log);
};
