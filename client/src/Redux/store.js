import { configureStore } from '@reduxjs/toolkit';
import serversReducer from './reducers/serversReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    servers: serversReducer,
  },
});
