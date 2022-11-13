import { ADD_MONEY_POCKET, PAY_MONEY_POCKET, SET_MONEY_POCKET } from '../type';

export default function pocketReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MONEY_POCKET: return payload;
    case ADD_MONEY_POCKET: return state + payload;
    case PAY_MONEY_POCKET: return payload;
    default: return state;
  }
}
