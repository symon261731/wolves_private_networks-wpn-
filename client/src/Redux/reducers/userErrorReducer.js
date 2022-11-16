import { ERROR_USER } from '../type';

// eslint-disable-next-line no-unused-vars
export default function orderReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case ERROR_USER:
      console.log(payload);
      return payload;
    default: return null;
  }
}
