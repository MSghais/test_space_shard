// store.ts
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appSlice } from "./app";
import { datasSlice } from "./datas";
import { userSlice } from "./user";
// Create the Redux store
const store = configureStore({
  reducer: {
    datas:datasSlice.reducer,
    app:appSlice.reducer,
    user:userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
