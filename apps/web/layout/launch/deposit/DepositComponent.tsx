import { Box, Text, Button, CardFooter, Input } from "@chakra-ui/react";
import { LoanCardView, DepositByUser } from "../../../types";
import {
  Uint256,
  cairo,

} from "starknet";
import { feltToAddress, feltToString } from "../../../utils/starknet";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import {
  ExternalStylizedButtonLink,
} from "../../../components/button/NavItem";
import { CONFIG_WEBSITE } from "../../../constants";
import { DepositInteractions } from "./DepositInteractions";

interface IDepositComponentPageView {
  deposit?: DepositByUser;
  viewType?: LoanCardView;
  id?: number;
}

/** @TODO get component view ui with call claim reward for recipient visibile */
export const DepositComponent = ({ deposit, viewType, id }: IDepositComponentPageView) => {
  const account = useAccount().account;
  const address = account?.address;

  const [withdrawTo, setWithdrawTo] = useState<string | undefined>(address);
  const [amountToBuy, setAmountToBuy] = useState<Uint256 | undefined>(
    cairo.uint256(0)
    // 0
  );
  useEffect(() => {
    const updateWithdrawTo = () => {
      if (!withdrawTo && address) {
        setWithdrawTo(address);
      }
    };
    updateWithdrawTo();
  }, [address]);

  const owner = deposit?.owner?.toString();
  function timeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  }
  const asset = deposit?.asset && feltToAddress(BigInt(deposit?.asset));
  const quote_address = deposit?.quote_token_address ? feltToAddress(BigInt(deposit?.quote_token_address)) : "0x";
  let total_amount = deposit?.deposited;
  let remain_token_to_be_claimed = deposit?.remain_token_to_be_claimed;
  let total_token_to_be_claimed = deposit?.total_token_to_be_claimed;
  let total_withdraw = deposit?.withdrawn;
  console.log("deposit", deposit);
  return (
    <>
      <Box
        textAlign={"left"}
        maxW={{ base: "100%" }}
        p={{ base: "1.5em", md: "1.5em" }}
        rounded={"1em"}
        overflow={"hidden"}
        // justifyContent={"space-between"}
        height={"100%"}
      >
{/* 
        {deposit.asset && <Text>Asset: {asset}</Text>}

        {deposit?.asset &&
          <ExternalStylizedButtonLink
            // pb={{ base: "0.5em" }}
            textOverflow={"no"}
            maxW={{ md: "170px" }}
            href={`${CONFIG_WEBSITE.page.goerli_voyager_explorer}/contract/${asset}`}
          >
            <Text> Asset</Text>
          </ExternalStylizedButtonLink>
        } */}
     
   
        <DepositInteractions deposit={deposit} id={id}></DepositInteractions>


      </Box>
    </>
  );
};
