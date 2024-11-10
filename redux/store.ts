import {configureStore} from '@reduxjs/toolkit';
import currentUserSliceReducer from './currentUserInfo';
import {useDispatch} from 'react-redux';

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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
