import { Loans, Token , Deposit} from "db_mongo";
import { IconType } from "react-icons";
import { GetTransactionReceiptResponse, Uint256 } from "starknet";

export const ImageAttachmentLogo = {
  filename: "wuw.png",
  path: "assets/wuw.png", // Provide the correct path to your image
  cid: "wuw.png", // Use a unique identifier
};

export interface ITokensWithRelations extends Token {

}
export interface IFundingSalesRelations extends Loans {

}

/** UI interface */

export enum TypeCreationLaunch {
  CREATE_LOAN = "CREATE_LOAN",
}
export enum LoanCardView {
  SENDER_VIEW = "SENDER_VIEW",
  RECIPIENT_VIEW = "RECIPIENT_VIEW"
}

export interface TxCallInterface {
  tx?: GetTransactionReceiptResponse;
  isSuccess?: boolean;
  message?: string;
  hash?: string
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

export interface CreateLoan extends  Loans {

}


export interface CreateRangeProps {
  sender: string;
  recipient: string;
  total_amount: number;
  asset: string;
  cancelable: boolean;
  range: Range;

}

/** Contract interface */
export interface LaunchInterface extends Loans {
  id:string;
  createdAt:Date;
  endAt:Date;

}

export interface DepositByUser extends Deposit{
  id:string;
  launch_id?: number;
  createdAt?:Date;
  asset?: string;
  owner: string;
  quote_token_address?: string;
  totalDeposit: number;
  interestPercentage?:number;
  loanDeposit?:Loans

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

