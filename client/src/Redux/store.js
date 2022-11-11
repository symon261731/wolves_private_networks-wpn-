import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import serversReducer from './reducers/serversReducer';
import orderReducer from './reducers/orderReducer';
import currentOrderReducer from './reducers/currentOrderReducer';
import issuedOrderReducer from './reducers/issuedOrderReducer';
import commentsReducer from './reducers/commentsReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    servers: serversReducer,
    order: orderReducer,
    currentOrder: currentOrderReducer,
    issuedOrder: issuedOrderReducer,
    comments: commentsReducer,

  },
});
