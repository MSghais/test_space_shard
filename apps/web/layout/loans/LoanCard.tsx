import {  Card, } from "@chakra-ui/react";
import { LoanInterface, LoanCardView } from "../../types";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { LoansComponent } from "./LoansComponent";

interface ILoanCard {
  loan?: LoanInterface;
  viewType?: LoanCardView;
}

/** @TODO get component view ui with call claim reward for recipient visibile */
export const LoanCard = ({ loan, viewType, }: ILoanCard) => {
  const account = useAccount().account;
  const address = account?.address;
  return (
    <>
      <Card
        textAlign={"left"}
        shadow={"xl"}
        maxW={{ base: "100%" }}
        minH={{ base: "150px" }}
        py={{ base: "0.5em" }}
        p={{ base: "1.5em", md: "1.5em" }}
        w={{ base: "100%", md: "330px", lg: "450px" }}
        maxWidth={{ lg: "750px" }}
        rounded={"1em"}
        overflow={"hidden"}
        justifyContent={"space-between"}
        border={"1px"}
        height={"100%"}
      >
        <LoansComponent loan={loan} ></LoansComponent>
      </Card>
    </>
  );
};
