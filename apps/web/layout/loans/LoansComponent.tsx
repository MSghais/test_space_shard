import { Box, Card, Text, Button, CardFooter, Input, Progress } from "@chakra-ui/react";
import {
  Uint256,
  cairo,
} from "starknet";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { LoansInteractions } from "./LoansInteractions";
import { LoanCardView, LaunchInterface } from "../../types";
import { formatDateTime } from "../../utils/format";

interface ILaunchPageView {
  loan?: LaunchInterface;
  viewType?: LoanCardView;
  id?: number;
}

export const LoansComponent = ({ loan, viewType, id }: ILaunchPageView) => {
  const startDate = new Date(loan?.createdAt);
  const endDateBn = Number(loan?.endAt?.toString());
  const endDate = new Date(endDateBn);
  const account = useAccount().account;
  const address = account?.address;
  const [withdrawTo, setWithdrawTo] = useState<string | undefined>(address);
  const [amountToBuy, setAmountToBuy] = useState<Uint256 | undefined>(
    cairo.uint256(0)
  );
  useEffect(() => {
    const updateWithdrawTo = () => {
      if (!withdrawTo && address) {
        setWithdrawTo(address);
      }
    };
    updateWithdrawTo();
  }, [address]);

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
        <Box>
          <Box>
         
            <Box

              display={{ base: "flex" }}
              justifyItems={"start"}
              alignContent={"start"}
              justifyContent={"space-around"}
            >

            </Box>

          </Box>
        </Box>
        {loan?.limitDeposit && <Text>Limit deposit: {loan?.limitDeposit}</Text>}
        {loan?.interestPercentage && <Text>Annual interest: {loan?.interestPercentage} %</Text>}
        {loan?.collateralRatio && <Text>Collateral ratio  : {loan?.collateralRatio} %</Text>}
        <Box>
          <Text wordBreak={"break-all"}>Asset address:</Text>
        </Box>

        <Box
          display={{ md: "flex" }}
        >
          <Box>
            <Text>Start Date: {formatDateTime(startDate)}</Text>
          </Box>

        </Box>
        <LoansInteractions loan={loan} id={id}></LoansInteractions>

      </Box>
    </>
  );
};
