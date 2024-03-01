import { Loans, Token, Deposit } from "db_mongo";
import { IconType } from "react-icons";
import { GetTransactionReceiptResponse, Uint256 } from "starknet";

export const ImageAttachmentLogo = {
  filename: "wuw.png",
  path: "assets/wuw.png", // Provide the correct path to your image
  cid: "wuw.png", // Use a unique identifier
};

export interface ITokensWithRelations extends Token {}
export interface IFundingSalesRelations extends Loans {}

/** UI interface */

export enum TypeCreationLaunch {
  CREATE_LOAN = "CREATE_LOAN",
}
export enum LoanCardView {
  SENDER_VIEW = "SENDER_VIEW",
  RECIPIENT_VIEW = "RECIPIENT_VIEW",
}


/** Loan Interface with relations */
export interface LoanInterface {
  id: string;
  priceByToken: string | null;
  tokenLimitMint: number;
  limitDeposit: number;
  interestPercentage: number | null;
  totalBorrowed: number | null;
  collateralRatio: number | null;
  name: string | null;
  owner: string;
  tokenAddress: string | null;
  price: string | null;
  addressToPay: string | null;
  totalToBuy: string | null;
  totalSupply: number | null;
  createdAt: Date;
  updatedAt: Date;
  endAt: Date | null;
  ownerId: string | null;
  assetIdFund?: Token;
  assetIdCollateral?: Token;
}

export interface LaunchInterfaceBasic extends Loans {
  id: string;
  createdAt: Date;
  endAt: Date;
}

export interface DepositByUser extends Deposit {
  id: string;
  createdAt: Date;
  totalDeposit: number;
  interestPercentage: number;
  loanDeposit?: Loans;
}


export interface TxCallInterface {
  tx?: GetTransactionReceiptResponse;
  isSuccess?: boolean;
  message?: string;
  hash?: string;
}
export interface LinkItemProps {
  name: string;
  title?: string;
  icon: IconType;
  href: string;
  target?: string;
  isExternal?: boolean;
  isSubmenu?: boolean;
  linksSubmenu?: LinkItemProps[];
}

export interface CreateLoan extends Loans {}

export interface CreateRangeProps {
  sender: string;
  recipient: string;
  total_amount: number;
  asset: string;
  cancelable: boolean;
  range: Range;
}



export interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
  target?: string;
  isExternal?: boolean;
  isSubmenu?: boolean;
  title?: string;
  linksSubmenu?: LinkItemProps[];
}
