import {
  Box,
  Text,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { LoanInterface, LoanCardView } from "../../types";
import {
  Uint256,
  cairo,
} from "starknet";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import axios from "axios";

interface ILaunchPageView {
  loan?: LoanInterface;
  viewType?: LoanCardView;
  id?: number;
}

export const LoansInteractions = ({ loan, viewType, id }: ILaunchPageView) => {
  const toast = useToast();
  const account = useAccount().account;
  const address = account?.address;

  const [withdrawTo, setWithdrawTo] = useState<string | undefined>(address);
  const [amount, setAmount] = useState<number | undefined>(0);
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

  const handleBorrowLoan = async () => {
    try {
      console.log("amount", amount);
      console.log("loan", loan);
      const res = await axios.post("/api/restricted/loans/borrowByLoan", {
        loanId: loan?.id,
        amount: amount,
      });

      toast({ title: "Borrow succeed" });
      console.log("res");
    } catch (e) {
      console.log("handleBorrowLoan", e);
      toast({ title: "Error in borrow", status: "error" });
    }
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
        {amountToBuy && Number(amountToBuy) > 0 && (
          <Text>Amount to borrow: {Number(amountToBuy)}</Text>
        )}
        <Input
          py={{ base: "0.5em" }}
          type="number"
          my={{ base: "0.25em", md: "0.5em" }}
          maxW={"fit-content"}
          minW={{ base: "100px", md: "150px" }}
          onChange={(e) => {
            setAmount(Number(e?.target?.value));
          }}
          placeholder="Amount to borrow"
        ></Input>
        <Box
          gap="1em"
          justifyContent={"start"}
          justifyItems={"left"}
          justifySelf={"self-start"}
          display={"flex"}
          gridTemplateColumns={{ md: "repeat(3,1fr)" }}
        >
          <Button
            width={"100%"}
            my={{ base: "0.25em" }}
            onClick={() => handleBorrowLoan()}
          >
            Borrow
          </Button>

        </Box>
      </Box>
    </>
  );
};
