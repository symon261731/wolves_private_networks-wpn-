import { ADD_COMMENT, SET_COMMENT, EDIT_COMMENT } from '../type';

export default function listsReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_COMMENT:
      return payload;
      // case DELETE_LIST:
      //   return state.filter((note) => note.id !== payload);
    case ADD_COMMENT:
      return [...state, payload];
      // case EDIT_LIST:
      //   return state.map((note) => (note.id === payload.id ? payload : note));
    case EDIT_COMMENT:
      console.log({ payload });
      return state.map((comment) => (comment.Comment.id === payload.Comment.id ? payload : comment));
    default:
      return state;
  }
}
