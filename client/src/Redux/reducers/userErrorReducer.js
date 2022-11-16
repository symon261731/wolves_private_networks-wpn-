import { ERROR_USER } from '../type';

export default function orderReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case ERROR_USER:
      console.log(payload);
      return payload;
    default: return state;
  }
}
