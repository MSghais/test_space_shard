import type { NextPage } from "next";
import {
  Box,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import HeaderSEO from "../components/HeaderSEO";
import { CONFIG_WEBSITE } from "../constants";
import { ButtonLink } from "../components/button";
import AccountView from "../components/starknet/AccountView";
import { LoansViewContainer } from "../layout/loans/LoansViewContainer";
import { useEffect, useState } from "react";

const Home: NextPage = ({}) => {
  const color = useColorModeValue("gray.900", "gray.300");
  const bg = useColorModeValue("gray.700", "gray.500");
  const {
    isOpen,
    onOpen: onOpenConnectModal,
    onClose: onCloseConnectModal,
  } = useDisclosure();

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {

    const getAllDatas = () => {

    }

  },[])
  return (
    <>
      <HeaderSEO></HeaderSEO>

      <Box
        height={"100%"}
        width={"100%"}
        minH={{ sm: "70vh" }}
        overflow={"hidden"}
        alignContent={"center"}
        justifyItems={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Box display={{ lg: "flex" }} justifyContent={"space-between"}>
          <Box
            textAlign={{ base: "left", md: "center" }}
            p={{ base: "1em" }}
            minH={{ sm: "70vh" }}
            minW={{ lg: "950px" }}
            px={{ base: "1em" }}
            color={color}
          >
            <Box textAlign={"left"} py={{ base: "0.5em" }}>
              <Image src="/assets/starknet_logo.svg" alt="LFG"></Image>
              <Text
                fontFamily={"PressStart2P"}
                fontSize={{ base: "19px", md: "23px", lg: "27px" }}
              >
                {CONFIG_WEBSITE.title}✨
              </Text>

              <Text
                fontFamily={"PressStart2P"}
                fontSize={{ base: "17px", md: "19px", lg: "23px" }}
              >
                Build whatever
              </Text>

              <Box
                // display={{ md: "flex" }}
                gap="1em"
              >
                <AccountView></AccountView>
                <Box width={{ base: "100%" }} py={{ base: "0.5em" }}>
          
                  <ButtonLink
                    href="/create"
                    title="Create whatever"
                  ></ButtonLink>
                </Box>
              </Box>
            </Box>

            <LoansViewContainer></LoansViewContainer>

          
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Home;
