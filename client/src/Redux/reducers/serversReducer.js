import {
  ADD_SERVERS,
  SET_SERVERS,
} from '../type';

export default function listsReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SERVERS:
      return payload;
    // case DELETE_LIST:
    //   return state.filter((note) => note.id !== payload);
    case ADD_SERVERS:
      return [...state, payload];
    // case EDIT_LIST:
    //   return state.map((note) => (note.id === payload.id ? payload : note));
    default:
      return state;
  }
}
