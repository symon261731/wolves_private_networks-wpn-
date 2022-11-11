import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import serversReducer from './reducers/serversReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    servers: serversReducer,
  },
});
