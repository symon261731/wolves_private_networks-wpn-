import axios from 'axios';
import { ADD_MONEY_POCKET, PAY_MONEY_POCKET } from '../type';

export const addMoneyPocket = (payload) => ({ type: ADD_MONEY_POCKET, payload });
export const payMoneyPocket = (payload) => ({ type: PAY_MONEY_POCKET, payload });

export const addMoneyPocketThunk = () => (dispatch) => {
  axios
    .post()
    .then((res) => dispatch(addMoneyPocket(res.data)))
    .catch(console.log);
};

export const payMoneyPocketThunk = () => (dispatch) => {
  axios
    .post()
    .then((res) => dispatch(payMoneyPocket(res.data)))
    .catch(console.log);
};
