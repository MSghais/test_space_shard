import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import HeaderSEO from "../HeaderSEO";
import CreateLoanForm from "../form/loan";

enum CreateFormSelector {
  LOAN = "LOAN",
  ASSET = "ASSET",
  CHANNEL = "CHANNEL",
  SPACE = "SPACE",
  POST = "POST",
}

enum CreateContractFormSelector {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  FUND_ERC20 = "FUND_ERC20",
  MINT_ERC721 = "MINT_ERC721",
}

enum GroupOrContract {
  LENDING = "LENDING",
  CONTRACTS = "CONTRACTS",
  PROJECT = "PROJECT",
}
const CreateViewComponent = () => {
  const [groupForm, setGroupForm] = useState<CreateFormSelector>();
  const [contractFrom, setContractFrom] =
    useState<CreateContractFormSelector>();
  const [groupOrContract, setGroupOrContract] = useState<GroupOrContract>(
    GroupOrContract.LENDING
  );

  return (
    <>
      <HeaderSEO />
      <Box
        height={"100%"}
        width={"100%"}
        minH={{ sm: "70vh" }}
        overflow={"hidden"}
        overflowX={"hidden"}
        alignContent={"center"}
        justifyItems={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Box
          justifyContent={"center"}
          justifyItems={"center"}
          textAlign={"center"}
          p={{ base: "0.25em", md: "1em" }}
        >
          <Text
            fontFamily={"PressStart2P"}
            // fontFamily={"monospace"}
          >
            What do you love to create?
          </Text>
          <Box
            display={"flex"}
            gap={{ base: "0.5em" }}
            px={{ base: "0.25em", md: "1em", lg: "3em" }}
          >
            <Button
           
            >
              Loan and Lend
            </Button>
          </Box>

          <Box
            // p={{ sm: "1em", md: "3em" }}
            alignItems={"center"}
            textAlign={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
            // display={{ md: "flex" }}
            gap={{ base: "1em" }}
            px={{ base: "0.25em", md: "1em", lg: "3em" }}
            py={{ base: "0.25em", md: "0.5em", lg: "1em" }}

            // px={{ md: "3em" }}
          >
            <Tabs
              variant="enclosed"
              //  p={{ sm: "1em", md: "3em" }}
              alignItems={"center"}
              gap={{ sm: "1em" }}
            >
              <TabList>
                <Tab
                  // color={{ base: "green.300" }}
                  onClick={() => setGroupForm(CreateFormSelector.LOAN)}
                >
                  Loan
                </Tab>
               

              </TabList>

              <TabPanels>
                <TabPanel>
                  <CreateLoanForm></CreateLoanForm>
                </TabPanel>

              
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </>
  );
};


export default CreateViewComponent;
