import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {  IFundingSalesRelations, ITokensWithRelations, } from "../../types";
import { Loans, Token, Prisma } from "db_mongo";
// Define a slice of your application state
interface DatasState {
  loading: boolean;
  loans:IFundingSalesRelations[]
  selectedFundingSale: Loans | undefined;
  totalCount: number;
  selectedToken: undefined | Token;
  allTokens:ITokensWithRelations[]
}

const initialState: DatasState = {
  // value: false,
  selectedFundingSale: undefined,
  selectedToken: undefined,
  loans:[],
  allTokens:[],
  totalCount:undefined,
  loading:false,
};

export const useDatasDispatch = () => {
  const dispatch = useDispatch();
  const dispatchAllLoans = (allLoans: IFundingSalesRelations[]) => {
    dispatch(getLoadAllSales(allLoans));
  };

  const dispatchSelectedLoan = (
    selectedLoan: IFundingSalesRelations
  ) => {
    console.log("dispatch action selectedLoan", selectedLoan);
    dispatch(setSelectedFunding(selectedLoan));
  };

  return {
    dispatchAllLoans,
    dispatchSelectedLoan,
  };
};

export const datasSlice = createSlice({
  name: "datas",
  initialState,
  reducers: {
 
    setSelectedFunding: (
      state,
      action: PayloadAction<IFundingSalesRelations | undefined>
    ) => {
      state.selectedFundingSale = action.payload;
    },
    getLoadAllSales: (
      state,
      action: PayloadAction<IFundingSalesRelations[]>
    ) => {
      state.loans = action.payload;
    },
    isLoading: (state) => {
      state.loading = false;
    },
    isLoadingFinish: (state) => {
      state.loading = false;
    },
  },
});

export const {
  isLoading,
  isLoadingFinish,
  getLoadAllSales,
  setSelectedFunding,
} = datasSlice.actions;
