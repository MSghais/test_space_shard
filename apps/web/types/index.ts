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
  launch_id?: number;
  asset?: string;
  owner: string;
  quote_token_address?: string;
  deposited?: number;
  redeemable: string;
  withdrawn: Uint256;
  withdraw_amount: Uint256;
  refunded: Uint256;
  is_canceled?: boolean;
  remain_token_to_be_claimed: Uint256;
  total_token_to_be_claimed: Uint256;
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

