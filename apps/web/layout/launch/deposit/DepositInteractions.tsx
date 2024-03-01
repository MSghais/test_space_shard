import { Box, Text, Button, CardFooter, Input, useToast } from "@chakra-ui/react";
import { LoanCardView, DepositByUser } from "../../../types";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";

interface ILaunchPageView {
  deposit?: DepositByUser;
  viewType?: LoanCardView;
  id?: number;
}

export const DepositInteractions = ({
  deposit,
  viewType,
  id,
}: ILaunchPageView) => {
  const account = useAccount().account;
  const address = account?.address;
  const toast = useToast()

  const [withdrawTo, setWithdrawTo] = useState<string | undefined>(address);
  const [amountToBuy, setAmountToBuy] = useState<number | undefined>(
    0
  );
  useEffect(() => {
    const updateWithdrawTo = () => {
      if (!withdrawTo && address) {
        setWithdrawTo(address);
      }
    };
    updateWithdrawTo();
  }, [address]);

  const handleRepay = () => {

    toast({title:"Repay in process"})
  };

  return (
    <>
      <Box
        textAlign={"left"}
        maxW={{ base: "100%" }}
        p={{ base: "1.5em", md: "1.5em" }}
        rounded={"1em"}
        overflow={"hidden"}
        height={"100%"}
      >
        <Box
          gap="1em"
          justifyContent={"start"}
          justifyItems={"left"}
          justifySelf={"self-start"}
          display={{ md: "grid" }}
        >
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
            placeholder="Amount to repay"
          ></Input>

          <Button onClick={() => handleRepay()}>Repay</Button>
        </Box>
      </Box>
    </>
  );
};
