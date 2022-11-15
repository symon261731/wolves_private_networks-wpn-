/* eslint-disable no-param-reassign */
import { DONE_NEW_ORDER, SET_CURRENT_ORDER } from '../type';

export default function orderReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_ORDER: return payload;
    // отправить заказ на рассмотрение со стороны выполняющего
    case DONE_NEW_ORDER: return state.map((el) => {
      if (el.id === payload.id) {
        el.status = 'closed';
        return el;
      }
      return el;
    });

    default: return state;
  }
}
