import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Box,
  useToast,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getProfileBySession, getProfilePageBySession } from "../hooks/profile";
import { useUserDispatch } from "../store/user";
import { useRouter } from "next/router";
import SocialLoader from "../components/loader/SocialLoader";
import { MdVerified } from "react-icons/md";
import { BsDiscord, BsTwitterX } from "react-icons/bs";
import { useSession } from "next-auth/react";
import HeaderSEO from "../components/HeaderSEO";
import {User} from "db_mongo"

const MyProfile: NextPage = () => {
  const account = useAccount();
  const session = useSession();
  const toast = useToast();
  // const _signer = useSigner()

  const stateUser = useSelector((state: RootState) => state.user);
  const userConnected = stateUser?.userConnected;
  const [profile, setProfileUser] = useState<User | undefined>(
    userConnected
  );
  const [profileLoad, setProfileLoad] = useState<User | undefined>(
    userConnected
  );
  const [isLoadingProfileDb, setLoadingProfileDb] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFirstLoadDone, setIsFirstLoadDone] = useState<boolean>(false);
  const [isErrorProfile, setIsErrorProfile] = useState<boolean>(false);
  const { dispatchLoadingUser, dispatchUserConnected } = useUserDispatch();

 
  // Initial Page Load Data
  useEffect(() => {
    const getProfile = async () => {
      try {
        console.log("getProfile");
        if (
          session?.data?.user
          // && !userConnected
        ) {
          console.log("load session data");
          const res = await getProfilePageBySession();
          console.log("res", res);
          if (res?.status != 200) {
            return;
          }
          setProfileUser(res?.data?.data);
          dispatchUserConnected(res?.data?.data);
        }
      } catch (e) {
      } finally {
      }
    };

    if (
      // address&&
      !isLoadingProfileDb &&
      !profile &&
      !isErrorProfile
    ) {
      getProfile();
    }
  }, [isLoadingProfileDb, profile, account.address, isErrorProfile]);

  console.log("profile", profile);

  const router = useRouter();

  return (
    <>
      <HeaderSEO></HeaderSEO>
      <Box
        height={"100%"}
        width={"100%"}
        minH={{ base: "90vh" }}
        overflow={"hidden"}
        overflowX={"hidden"}
        alignContent={"center"}
        justifyItems={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Box display={{ md: "flex" }}>
          <Box textAlign={{ base: "left" }} p={{ base: "1em" }}>
         
            {isLoading && (
              <Box>
                <SocialLoader></SocialLoader>
              </Box>
            )}

       
            <Box
              py="1em"
              display={"flex"}
              alignItems={"baseline"}
              gap={{ base: "0.5em" }}
              width={"fit-content"}
            >
              <Box
                // display={"flex"}
                gap="0.5em"
                border="1px"
                // w={"fit-content"}
                py={{ base: "0.5em" }}
                height={"100%"}
                p={{ base: "0.5em" }}
                borderColor={"brand.primary"}
                borderRadius={{ base: "7px" }}
              //  gap="0.5em"
              >
            
              </Box>

             
            </Box>
        
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MyProfile;
