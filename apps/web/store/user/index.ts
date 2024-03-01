import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {  User } from "db_mongo";
// Define a slice of your application state
interface UserState {
  loading: boolean;
  userConnected?: User;
  totalCount: number;
  isTryFirstLoadUser?:boolean;
  isLoadingUser?:boolean;
}

const initialState: UserState = {
  // value: false,
  loading: false,
  userConnected: undefined,
  totalCount: 0,
  isTryFirstLoadUser:false,
  isLoadingUser:false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
 
    setUserConnected: (state, action: PayloadAction<User | undefined>) => {
      console.log("state", state);
      console.log("action", action);
      state.userConnected = action.payload;
      console.log(" state.userConnected", state.userConnected);
    },
    setLoadingUser: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      console.log("state", state);
      console.log("action", action);
      state.isLoadingUser = action.payload;
    },
    setIsTryFirstLoadingUser: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      console.log("state", state);
      console.log("action", action);
      state.isTryFirstLoadUser = action.payload;
    },
  },
});

export const {
  setUserConnected,
  setIsTryFirstLoadingUser,
  setLoadingUser
} = userSlice.actions;

export const useUserDispatch = () => {
  const dispatch = useDispatch();
  const dispatchUserConnected = (userConnected: User) => {
    dispatch(setUserConnected(userConnected));
  };

  const dispatchLoadingUser = (isLoading: boolean) => {
    dispatch(setLoadingUser(isLoading));
  };
  const dispatchIsTryLoadingUser = (isTryLoadingUserLoading: boolean) => {
    dispatch(setIsTryFirstLoadingUser(isTryLoadingUserLoading));
  };

  // const dispatchSessionUser = (session: Session) => {
  //   dispatch(setSessionUserConnected(session));
  // };
  return {
    dispatchUserConnected,
    // dispatchSessionUser,
    dispatchIsTryLoadingUser,
    dispatchLoadingUser
  };
};
