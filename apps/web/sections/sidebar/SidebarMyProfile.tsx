import React from "react";
import { Avatar, Button, Icon, Tooltip, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiHome, BiPlus, BiVideo } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { useAccount, useDisconnect } from "wagmi";
import { CustomConnectButtonWallet } from "../../components/button/CustomConnectButtonWallet";
import { TbMilitaryRank } from "react-icons/tb";
export type Tabs = "home" | "create" | "join" | "dashboard";

const SidebarMyProfile = () => {
  const router = useRouter();
  const address = useAccount().address;
  const disconnect = useDisconnect();

  const tabs = [
    {
      name: "home",
      content: "Home",
      link: "/",
      icon: (
        <Icon mr={{ sm: "1em" }}>
          <BiHome
            // set='bold'
            // primaryColor='#E0E1E2'
            size={32}
          />
          ,
        </Icon>
      ),
    },
    {
      name: "join",
      content: "Join Meeting",
      link: "/join",
      icon: (
        <Icon mr={{ sm: "1em" }}>
          <BiVideo
            // set='bold'
            size={32}
          />
          ,
        </Icon>
      ),
    },
    {
      name: "create",
      content: "Create Meetings",
      link: "/create",

      icon: (
        <Icon mr={{ sm: "1em" }}>
          <BiPlus size={32} />
        </Icon>
      ),
    },
    {
      name: "Ranking",
      content: "Ranking",
      link: "/ranking",

      icon: (
        <Icon mr={{ sm: "1em" }}>
          <TbMilitaryRank size={32} />
        </Icon>
      ),
    },
  ];

  const handleClick = (tab: Tabs) => {
    router.push(tab === "home" ? "/" : `/${tab}`);
  };

  return (
    <div
      // className='hidden xl:flex flex-col h-screen !w-[88px] justify-between items-center border-r border-gray-600'
      // className='hidden xl:flex flex-col h-screen !w-[130px] justify-between items-center border-r border-gray-600'
      className="hidden md:flex flex-col h-screen !w-[250px] justify-between items-center border-r border-gray-600"
    >
      <div className="flex flex-col items-center w-full">
        <div
        // className='border-[1px] border-gray-600 w-full'
        />
        <Box
          className="flex flex-col items-center gap-8 mt-8 justify-center"
          alignItems={"flex-start"}
        >
          {!address && (
            <Box>
              <CustomConnectButtonWallet></CustomConnectButtonWallet>
            </Box>
          )}
          {/* <LoginButton></LoginButton> */}
          {tabs.map((tab, index) => (
            <Tooltip
              w={{ md: "100%" }}
              key={index}
              color="primary"
              content={tab.content}
            >
              <Button
                w={{ md: "100%" }}
                textAlign={"left"}
                justifyContent={"flex-start"}
                title={tab.name}
                fontSize={{ sm: "15px", md: "15px" }}
                onClick={() => handleClick(tab.name as Tabs)}
              >
                {tab.icon && tab.icon}
                {tab.content}
              </Button>
            </Tooltip>
          ))}
        </Box>
      </div>
      <div className="my-8">
        <Tooltip color="error" content="Disconnect" placement="right">
          <Button
            // auto
            // light
            // onPress={disconnect}
            onClick={() => disconnect.disconnect()}
            disabled={!address}
            // icon={<Logout set='bold' primaryColor='#F31260' size={32} />}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default SidebarMyProfile;
