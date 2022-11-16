import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import serversReducer from './reducers/serversReducer';
import myServersReducer from './reducers/myServersReducer';

import orderReducer from './reducers/orderReducer';
import currentOrderReducer from './reducers/currentOrderReducer';
import issuedOrderReducer from './reducers/issuedOrderReducer';
import commentsReducer from './reducers/commentsReducer';
import pocketReducer from './reducers/pocketReducer';
import userErrorReducer from './reducers/userErrorReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    servers: serversReducer,
    order: orderReducer,
    currentOrder: currentOrderReducer,
    issuedOrder: issuedOrderReducer,
    comments: commentsReducer,
    pocket: pocketReducer,
    myServers: myServersReducer,
    userError: userErrorReducer,
  },
});
