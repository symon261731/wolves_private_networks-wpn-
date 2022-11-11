import { SET_ORDER, ADD_ORDER } from '../type';

export default function orderReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ORDER: return payload;
    case ADD_ORDER: return [...state, payload];
    default: return state;
  }
}
