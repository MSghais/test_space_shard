import {
  Box,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { LoanInterface, LoanCardView } from "../../types";
import { useAccount } from "@starknet-react/core";

import { IFilterLaunch } from "./LoansViewContainer";
import { LoansInteractions } from "./LoansInteractions";

interface IStreamCard {
  loans?: LoanInterface[];
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
              <Th>Total borrowed</Th>
              <Th>Stats</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loans?.length > 0 &&
              loans.map((l, i) => {
                let interestPercentage = l?.interestPercentage;
                const toReceiveAnnualy: number | undefined =
                  (l?.totalBorrowed * interestPercentage) / 100;

                const amountToReceive: number | undefined =
                  (l?.totalBorrowed * interestPercentage) / 100;

                return (
                  <Tr
                    key={i}
                    justifyContent={"end"}
                    alignContent={"end"}
                    alignItems={"end"}
                  >
                    <Td>
                      {l?.assetIdFund && typeof l?.assetIdFund != "string" && (
                        <Box>
                          <Text wordBreak={"break-all"}>
                            Asset address: {l?.assetIdFund?.name}
                          </Text>
                          <Text wordBreak={"break-all"}>
                            Price in dollar: {l?.assetIdFund?.priceInDollar}
                          </Text>
                        </Box>
                      )}
                    </Td>
                    <Td>
                      <LoansInteractions loan={l}></LoansInteractions>
                    </Td>
                    <Td>{l?.createdAt?.toString()}</Td>
                    <Td>{l?.interestPercentage?.toString()}</Td>
                    <Td>{l?.totalBorrowed?.toString()}</Td>
                    <Td>
                      <Box>
                        <Text>Percentage interest: {interestPercentage} %</Text>
                        {!Number.isNaN(toReceiveAnnualy) && (
                          <Box>
                            <Text>To gain: {toReceiveAnnualy} per year</Text>
                          </Box>
                        )}
                      </Box>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </>
      </Table>
    </Box>
  );
};
