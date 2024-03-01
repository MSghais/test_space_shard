import { Box, Text, Button, CardFooter, Input } from "@chakra-ui/react";
import { LoanCardView, DepositByUser } from "../../../types";
import {
  Uint256,
  cairo,
  uint256,
} from "starknet";
import { feltToAddress, feltToString } from "../../../utils/starknet";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";

interface ILaunchPageView {
  deposit?: DepositByUser;
  viewType?: LoanCardView;
  id?: number;
}

export const DepositInteractions = ({ deposit, viewType, id }: ILaunchPageView) => {
  const account = useAccount().account;
  const address = account?.address;

  const [withdrawTo, setWithdrawTo] = useState<string | undefined>(address);
  const [amountToBuy, setAmountToBuy] = useState<number | undefined>(
  0
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

        <Box
          gap="1em"
          justifyContent={"start"}
          // justifyContent={"space-around"}
          justifyItems={"left"}
          justifySelf={"self-start"}
          display={{ md: "grid" }}
        >
          {amountToBuy && Number(amountToBuy) > 0 && (
            <Text>Amount to buy: {Number(amountToBuy)}</Text>
          )}
          <Input
            py={{ base: "0.5em" }}
            type="number"
            my={{ base: "0.25em", md: "0.5em" }}
            maxW={"fit-content"}
            minW={{ base: "100px", md: "150px" }}
            onChange={(e) => {
              let nb = Number(e?.target?.value);
              setAmountToBuy(nb);
            }}
            placeholder="Amount to buy"
          ></Input>

        </Box>

      </Box>
    </>
  );
};
