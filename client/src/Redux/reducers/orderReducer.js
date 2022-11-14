import {
  SET_ORDER, ADD_ORDER, SET_CURRENT_ORDER, SET_ISSUED_ORDER, SET_ONE_ORDER,
} from '../type';

export default function orderReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ORDER: return payload;
    case SET_ONE_ORDER: return payload;
    case ADD_ORDER: return [...state, payload];
    case SET_CURRENT_ORDER: return payload;
    case SET_ISSUED_ORDER: return payload;
    default: return state;
  }
}
