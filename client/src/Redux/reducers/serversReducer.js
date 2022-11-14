import {
  ADD_SERVERS,
  SET_SERVERS,
  EDIT_SERVER,
  LOGOUT_SERVER,
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
    case EDIT_SERVER:
      // console.log({ payload });
      return state.map((server) => (server.id === payload.id ? payload : server));
    case LOGOUT_SERVER:
      return state.map((server) => {
        const tmp = { ...server };
        tmp.subscribeStatus = false;
        return tmp;
      });
    default:
      return state;
  }
}
