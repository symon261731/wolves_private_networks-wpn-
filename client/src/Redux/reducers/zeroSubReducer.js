import {
  ZERO_SUB,
} from '../type';

export default function listsReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SERVERS:
      return payload;
    // case FILTER_SERVERS:
    //   console.log({ payload });
    //   return state.filter((server) => (
    //     payload.protocol.length ? payload.protocol.indexOf(server.protocol) >= 0 : 1
    //   )
    //   && (payload.location ? server.location === payload.location : 1)
    //   && (payload.raiting ? server.rating >= Number(payload.raiting) : 1)
    //   && server.price >= (Number(payload.from || 0))
    //   && server.price <= (Number(payload.to || Infinity)));
    case ADD_SERVERS:
      return [...state, payload];
    // case EDIT_LIST:
    //   return state.map((note) => (note.id === payload.id ? payload : note));
    default:
      return state;
  }
}
