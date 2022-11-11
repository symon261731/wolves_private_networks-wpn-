import axios from 'axios';
import { SET_CURRENT_ORDER } from '../type';

export const setCurrentOrder = (payload) => ({ type: SET_CURRENT_ORDER, payload });

export const setCurrentOrderThunk = () => (dispatch) => axios
  .get('/order/mywork')
  .then((res) => dispatch(setCurrentOrder(res.data)))
  .catch((error) => console.log(error));
