import {
  SET_ORDER, ADD_ORDER, SET_ONE_ORDER, GET_NEW_ORDER, REMOVE_FROM_ALL,
} from '../type';

export default function orderReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    // Для всех заказов
    case SET_ORDER: return payload;
    case ADD_ORDER: return [...state, payload];
      // Для заказов которые берет user
    case SET_ONE_ORDER: return payload;
    case GET_NEW_ORDER: return [...state, payload];
    case REMOVE_FROM_ALL: return state.filter((el) => el.id !== payload.id);
    default: return state;
  }
}
