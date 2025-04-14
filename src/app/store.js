import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../features/users/userApi'; // or adjust path if needed

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
