import { SET_ISSUED_ORDER, DONE_ISSUED_ORDER } from '../type';

export default function orderReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ISSUED_ORDER: return payload;
    case DONE_ISSUED_ORDER: return payload;
    default: return state;
  }
}
