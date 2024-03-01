import { Box, Text, Table, Thead, Tr, Th, Td, Tbody } from "@chakra-ui/react";
import { LoanCardView, DepositByUser } from "../../../types";
import { useAccount } from "@starknet-react/core";
import { DepositInteractions } from "./DepositInteractions";

interface ITableDepositByUser {
  deposits?: DepositByUser[];
  viewType?: LoanCardView;
}

export const TableDeposit = ({ viewType, deposits }: ITableDepositByUser) => {
  const account = useAccount().account;
  return (
    <Box overflowX={"auto"}>
      <Table overflow={"auto"} overflowX={"auto"}>
        <>
          <Thead>
            <Tr>
              <Th>Total deposit</Th>
              <Th>Created at</Th>
              <Th>Actions</Th>
              <Th>To pay annualy</Th>
            </Tr>
          </Thead>
          <Tbody>
            {deposits?.length > 0 &&
              deposits.map((deposit, i) => {
                let interestPercentage =
                  deposit?.loanDeposit?.interestPercentage ??
                  deposit?.interestPercentage;
                const toPayAnnualy: number | undefined =
                  (deposit?.totalDeposit * interestPercentage) / 100;
                console.log("deposit?.loanDeposit", deposit?.loanDeposit);
                console.log("toPay annualy", toPayAnnualy);

                return (
                  <Tr
                    key={i}
                    justifyContent={"end"}
                    alignContent={"end"}
                    alignItems={"end"}
                  >
                    <Td>{deposit?.totalDeposit}</Td>
                    <Td>{deposit?.createdAt?.toString()}</Td>
                    <Td>
                      <DepositInteractions
                        deposit={deposit}
                      ></DepositInteractions>
                    </Td>
                    <Td>
                      {!Number.isNaN(toPayAnnualy) && (
                        <Text>To pay: {toPayAnnualy}% per year</Text>
                      )}
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
