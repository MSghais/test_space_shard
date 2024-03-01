import { Box, Text, Button, CardFooter, Input } from "@chakra-ui/react";
import { LoanCardView, DepositByUser } from "../../../types";
import { Uint256, cairo } from "starknet";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";

import { DepositInteractions } from "./DepositInteractions";

interface IDepositComponentPageView {
  deposit?: DepositByUser;
  viewType?: LoanCardView;
  id?: number;
}

export const DepositComponent = ({
  deposit,
  viewType,
  id,
}: IDepositComponentPageView) => {
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

  let interestPercentage =
    deposit?.loanDeposit?.interestPercentage ?? deposit?.interestPercentage;
  const toPayAnnualy:number|undefined = (deposit?.totalDeposit * interestPercentage) / 100;
  console.log("deposit?.loanDeposit", deposit?.loanDeposit);
  console.log("toPay annualy", toPayAnnualy);
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
        <Text>{deposit?.createdAt?.toString()}</Text>
        <Text>Total deposit: {deposit?.totalDeposit}</Text>

        {!Number.isNaN(toPayAnnualy) &&
        <Text>To pay: {toPayAnnualy}% per year</Text>
        
        }
        <DepositInteractions deposit={deposit} id={id}></DepositInteractions>
      </Box>
    </>
  );
};
