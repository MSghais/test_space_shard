// store.ts
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
interface State {
  isLoading?:boolean;
  isLoaderOverlay?:boolean;

  loading?: boolean;

}

const initialState: State = {
  isLoaderOverlay: undefined,
  isLoading: undefined,
  loading: false,

};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
   
  },
});

export const useAppDispatch = () => {
  const dispatch = useDispatch();

};

export const {
  
} = appSlice.actions;
