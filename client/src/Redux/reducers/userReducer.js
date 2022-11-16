import {
  LOGOUT, SET_USER, EDIT_USER,
} from '../type';

// eslint-disable-next-line default-param-last
export default function userReducer(state = { loading: true }, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return payload;
    case LOGOUT:
      return {};
    case EDIT_USER:
      return { ...state, pocket: Number(state.pocket) + Number(payload.amount) };
    default:
      return state;
  }
}
