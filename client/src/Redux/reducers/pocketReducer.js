import { ADD_MONEY_POCKET, PAY_MONEY_POCKET } from '../type';

export default function pocketReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_MONEY_POCKET: return state + payload;
    case PAY_MONEY_POCKET: return state - payload;
    default: return state;
  }
}
