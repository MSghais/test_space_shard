import {
  Box,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
} from "@chakra-ui/react";
import { LaunchInterface, LoanCardView } from "../../types";
import { feltToAddress } from "../../utils/starknet";
import { useAccount } from "@starknet-react/core";

import { IFilterLaunch } from "./LoansViewContainer";
import { LoansInteractions } from "./LoansInteractions";

interface IStreamCard {
  loans?: LaunchInterface[];
  viewType?: LoanCardView;
  filterLaunch?: IFilterLaunch;
}

/** @TODO get component view ui with call claim reward for recipient visibile */
export const TableLoans = ({ viewType, loans, filterLaunch }: IStreamCard) => {
  const account = useAccount().account;
  return (
    <Box overflowX={"auto"}>
      <Table overflow={"auto"} overflowX={"auto"}>
        <>
          <Thead>
            <Tr>
              <Th>Asset </Th>
              <Th>Actions</Th>
              <Th>Created at</Th>
              <Th>Annual interest</Th>
              <Th>Amount to borrow</Th>
              <Th>Total borrowed</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loans?.length > 0 &&
              loans.map((l, i) => {
                return (
                  <Tr
                    key={i}
                    // height={{ base: "100%" }}
                    justifyContent={"end"}
                    alignContent={"end"}
                    alignItems={"end"}
                  >
                    <Td>{l?.assetIdFund?.toString()}</Td>
                    <Td><LoansInteractions loan={l}></LoansInteractions></Td>
                    <Td>{l?.createdAt?.toString()}</Td>
                    <Td>{l?.interestPercentage?.toString()}</Td>
                    <Td>{l?.totalBorrowed?.toString()}</Td>
                  </Tr>
                );
                // }
              })}
          </Tbody>
        </>
      </Table>
    </Box>
  );
};
