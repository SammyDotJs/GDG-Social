import {configureStore} from '@reduxjs/toolkit';
import currentUserSliceReducer from './currentUserInfo';

export const store = configureStore({
  reducer: {
    currentUser: currentUserSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
