import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import serversReducer from './reducers/serversReducer';
import orderReducer from './reducers/orderReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    servers: serversReducer,
    order: orderReducer,
  },
});
