import {
  SET_MY_SERVERS,
  ADD_MY_SERVERS,
  DELETE_MY_SERVER,
} from '../type';

export default function listsReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MY_SERVERS:
      return payload;
    case DELETE_MY_SERVER:
      // console.log({ payload });
      return state.filter((server) => (
        // payload.protocol.length ? payload.protocol.indexOf(server.protocol) >= 0 : 1
        server.id !== payload.id
      ));
    //   && (payload.location ? server.location === payload.location : 1)
    //   && (payload.raiting ? server.rating >= Number(payload.raiting) : 1)
    //   && server.price >= (Number(payload.from || 0))
    //   && server.price <= (Number(payload.to || Infinity)));
    case ADD_MY_SERVERS:
      return [...state, payload];
    // // case EDIT_LIST:
    //   return state.map((note) => (note.id === payload.id ? payload : note));
    default:
      return state;
  }
}
