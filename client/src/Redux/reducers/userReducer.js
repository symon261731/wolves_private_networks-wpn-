import { LOGOUT, SET_USER } from '../type';

// eslint-disable-next-line default-param-last
export default function userReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return payload;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
