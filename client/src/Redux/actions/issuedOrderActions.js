import axios from 'axios';
import { SET_ISSUED_ORDER } from '../type';

export const setIssuedOrder = (payload) => ({ type: SET_ISSUED_ORDER, payload });
// const serverHost = process.env.REACT_APP_SERVERHOST;

export const setIssuedOrderThunk = () => (dispatch) => axios
  .get('/order/myorders')
  .then((res) => dispatch(setIssuedOrder(res.data)))
  .catch((error) => console.log(error));
