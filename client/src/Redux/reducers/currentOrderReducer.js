import { SET_CURRENT_ORDER } from '../type';

export default function orderReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_ORDER: return payload;
    default: return state;
  }
}
