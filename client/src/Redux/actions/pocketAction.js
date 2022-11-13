import axios from 'axios';
import { ADD_MONEY_POCKET, PAY_MONEY_POCKET, SET_MONEY_POCKET } from '../type';

export const setMoneyPocket = (payload) => ({ type: SET_MONEY_POCKET, payload });
export const addMoneyPocket = (payload) => ({ type: ADD_MONEY_POCKET, payload });
export const payMoneyPocket = (payload) => ({ type: PAY_MONEY_POCKET, payload });

export const setMoneyPocketThunk = () => (dispatch) => {
  axios
    .get('/pocket/check')
    .then((res) => dispatch(setMoneyPocket(res.data)))
    .catch(console.log);
};

export const addMoneyPocketThunk = (param) => (dispatch) => {
  axios
    .post('/pocket/refill', { param })
    .then((res) => dispatch(addMoneyPocket(res.data)))
    .catch(console.log);
};

export const payMoneyPocketThunk = () => (dispatch) => {
  axios
    .post()
    .then((res) => dispatch(payMoneyPocket(res.data)))
    .catch(console.log);
};
