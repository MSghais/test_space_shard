import {
  Box,
  Button,
  Input,
  useToast,
  Text,
  useColorModeValue,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CreateLoan, TypeCreationLaunch } from "../../../types";

import { cairo, TransactionStatus } from "starknet";
import { ExternalStylizedButtonLink } from "../../button/NavItem";
import axios from "axios";

interface ICreateSaleForm {}

const CreateLoanForm = ({}: ICreateSaleForm) => {
  const toast = useToast();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [typeLaunchCreation, setTypeLaunchCreation] = useState<
    TypeCreationLaunch | undefined
  >(TypeCreationLaunch.CREATE_LOAN);
  const [form, setForm] = useState<Partial<CreateLoan> | undefined>({
    id: undefined,
    priceByToken: undefined,
    price: undefined,
    limitDeposit: undefined,
    interestPercentage: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    tokenAddress: undefined,
    assetIdCollateral: "65e0b2254fc3c5ed3bb10841",
    assetIdFund: "65e0b2254fc3c5ed3bb10841",
  });

  /** @TODO refacto */
  const prepareHandleLoan = async (typeOfCreation: TypeCreationLaunch) => {
    try {
      const res = await axios.post("/api/restricted/loans/createLoan", {
        loan: form,

        amountToDeposit: form?.totalSupply,
        interestPercentage: form?.interestPercentage,
      });
      toast({ title: "Loan created successfully"});
    } catch (e) {
      console.log("prepareCreateLaunch", e);
      toast({ title: "Error in loan", status: "error" });
    }
  };

  return (
    <Box
      width={{ base: "100%" }}
      py={{ base: "1em", md: "2em" }}
      px={{ base: "1em" }}
    >
      <Text fontFamily={"PressStart2P"} fontSize={{ base: "19px", md: "21px" }}>
        Start creating your Launch
      </Text>

      <Text>Select the type of Loan you want to create</Text>
      <Box
        py={{ base: "0.25em" }}
        justifyContent={"center"}
        display={"flex"}
        gap={{ base: "1em" }}
      >
        <Button
          onClick={() => setTypeLaunchCreation(TypeCreationLaunch.CREATE_LOAN)}
        >
          Create loan
        </Button>
      </Box>

      <Box
        py={{ base: "0.25em", md: "1em" }}
        display={{ md: "flex" }}
        height={"100%"}
        justifyContent={"space-around"}
        gap={{ base: "0.5em", md: "1em" }}
        alignContent={"baseline"}
        alignSelf={"self-end"}
        alignItems={"baseline"}
      >
        <Box height={"100%"} display={"grid"}>
          <Text textAlign={"left"} fontFamily={"PressStart2P"}>
            Basic details
          </Text>

          <Text textAlign={"left"}>Total amount of token to sell</Text>
          <Input
            my={{ base: "0.25em", md: "0.5em" }}
            py={{ base: "0.5em" }}
            type="number"
            placeholder="Total amount"
            onChange={(e) => {
              setForm({ ...form, totalSupply: Number(e.target.value) });
            }}
          ></Input>

          <Text>Asset possible: 65e0b2254fc3c5ed3bb10841</Text>

          <Text textAlign={"left"}>Asset</Text>

          {TypeCreationLaunch.CREATE_LOAN == typeLaunchCreation && (
            <Input
              // my='1em'
              my={{ base: "0.25em", md: "0.5em" }}
              py={{ base: "0.5em" }}
              aria-valuetext={form?.assetIdFund}
              onChange={(e) => {
                setForm({ ...form, assetIdFund: e.target.value });
              }}
              placeholder="Asset to fund ID"
            ></Input>
          )}

          <Text textAlign={"left"}>Token limit mint</Text>

          <Input
            // my='1em'
            my={{ base: "0.25em", md: "0.5em" }}
            py={{ base: "0.5em" }}
            onChange={(e) => {
              setForm({ ...form, tokenLimitMint: Number(e.target.value) });
            }}
            placeholder="Token limit mint"
          ></Input>

          <Box height={"100%"}>
            <Box>
              <Text textAlign={"left"}>Collateral asset</Text>
              <Input
                my={{ base: "0.25em", md: "0.5em" }}
                py={{ base: "0.5em" }}
                aria-valuetext={form?.assetIdCollateral}
                onChange={(e) => {
                  setForm({
                    ...form,
                    assetIdCollateral: e.target.value,
                  });
                }}
                placeholder="Collateral/Quote asset"
              ></Input>
            </Box>
          </Box>
        </Box>
        <Box
          // display={{ md: "flex" }}
          height={"100%"}
          gap={{ base: "0.5em" }}
          w={{ base: "100%", md: "fit-content" }}
        >
          <Text textAlign={"left"} fontFamily={"PressStart2P"}>
            Launchpad Details
          </Text>
          <Box
            height={"100%"}
            w={{ base: "100%", md: "450px" }}
            p={{ base: "1em" }}
            borderRadius={{ base: "5px" }}
          >
            <Text textAlign={"left"}>Annual interest %</Text>

            <Input
              py={{ base: "0.5em" }}
              type="number"
              my={{ base: "0.25em", md: "0.5em" }}
              onChange={(e) => {
                setForm({
                  ...form,
                  interestPercentage: Number(e.target.value),
                });
              }}
              placeholder="Annual interest % for borrower"
            ></Input>

            <Text textAlign={"left"}>Limit deposit</Text>

            <Input
              py={{ base: "0.5em" }}
              type="number"
              my={{ base: "0.25em", md: "0.5em" }}
              onChange={(e) => {
                setForm({
                  ...form,
                  limitDeposit: Number(e.target.value),
                });
              }}
              placeholder="Limit deposit"
            ></Input>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box
          textAlign={"center"}
          display={{ base: "flex" }}
          gap={{ base: "0.5em" }}
        >
          <Button
            bg={useColorModeValue("brand.primary", "brand.primary")}
            disabled={isDisabled}
            onClick={() => {
              prepareHandleLoan(TypeCreationLaunch.CREATE_LOAN);
            }}
          >
            Create loan
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateLoanForm;
