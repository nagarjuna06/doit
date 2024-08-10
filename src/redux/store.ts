import { configureStore } from "@reduxjs/toolkit";
import user from "./slice/auth";
import task from "./slice/task";

export const store = configureStore({
  reducer: {
    user,
    task,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
