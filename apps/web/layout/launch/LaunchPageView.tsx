import { Box, Card, Text, Button, CardFooter, Input } from "@chakra-ui/react";
import {
  Uint256,
  cairo,
  shortString,
  stark,
  validateAndParseAddress,
} from "starknet";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";

import { LoansComponent } from "../loans/LoansComponent";
import { LoansInteractions } from "../loans/LoansInteractions";
import {Loans} from "db_mongo"
import { LoanInterface, LoanCardView } from "../../types";
interface ILaunchPageView {
  loan?: LoanInterface;
  viewType?: LoanCardView;
  id?: number;
}

/** @TODO get component view ui with call claim reward for recipient visibile */
export const LaunchPageView = ({ loan, viewType, id }: ILaunchPageView) => {

  return (
    <>
      <Box
        textAlign={"left"}
        maxW={{ base: "100%" }}
        py={{ base: "0.5em" }}
        p={{ base: "1.5em", md: "1.5em" }}
        maxWidth={{ lg: "750px" }}
        rounded={"1em"}
        overflow={"hidden"}
        // justifyContent={"space-between"}
        height={"100%"}
      >
        <LoansComponent loan={loan} id={id}></LoansComponent>
        <LoansInteractions loan={loan} id={id}></LoansInteractions>
      </Box>
    </>
  );
};
