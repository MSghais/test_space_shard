import React, { ReactNode, useRef } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Link as LinkChakra,
  Image as ImageChakra,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import Link from "next/link";
import { BsQuestionCircle, BsTelegram } from "react-icons/bs";
import StylizedButtonLink, { ExternalStylizedButtonLink } from "../components/NavItem";
import {
  IoAddCircle,
  IoCall,
  IoCallOutline,
  IoSwapHorizontal,
} from "react-icons/io5";
import { TbBuildingCommunity, TbFriends } from "react-icons/tb";
import IconComponent from "../components/IconComponent";
import { ModeToggle } from "../components/button/ModeToggle";
import { useAccount } from "wagmi";
import LoginBtn from "../components/auth/LoginBtn";
import { CustomConnectButtonWallet } from "../components/button/CustomConnectButtonWallet";
import { BiUserCircle, BiVideo } from "react-icons/bi";
import { MdContactPhone } from "react-icons/md";
import ConnectModal from "../components/modal/login";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
  target?: string;
  isExternal?: boolean;
  isSubmenu?: boolean;
  title?: string;
  linksSubmenu?: LinkItemProps[];
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Create", icon: IoAddCircle, href: "/create" },
  { name: "Whatever", icon: TbFriends, href: "/whatever" },
  // { name: "Community", icon: TbFriends, href: "/communities", },
  { name: "Video call", icon: BiVideo, href: "/video" },
  { name: "DM", icon: MdContactPhone, href: "/dm" },
  { name: "Profile", icon: BiUserCircle, href: "/my_profile" },
  // { name: "Chat push", icon: ChatAlt2Icon, href: "/chat_push",  },
  // { name: "Dashboard", icon: BsTelegram, href: "/dashboard",  },
  // { name: "Lobby", icon: IoCallOutline, href: "/lobby",  },
  // { name: "Meet", icon: IoCall, href: "/meeting",  },
  // { name: "Chat", icon: BsTelegram, href: "/chat",  },
  // { name: "DM", icon: BsTelegram, href: "/dm",  },
  // { name: "Inbox", icon: BsTelegram, href: "/inbox",  },
];

const LinkItemsDesktop: Array<LinkItemProps> = [
  { name: "Create", icon: IoAddCircle, href: "/create" },
  { name: "Whatever", icon: BsQuestionCircle, href: "/whatever" },
  // { name: "Community", icon: TbFriends, href: "/communities", },
  // { name: "Video call", icon: BiVideo, href: "/video", },
  { name: "DM", icon: MdContactPhone, href: "/dm" },
  { name: "Profile", icon: BiUserCircle, href: "/my_profile" },
  // { name: "Chat push", icon: ChatAlt2Icon, href: "/chat_push",  },
  // { name: "Dashboard", icon: BsTelegram, href: "/dashboard",  },
  // { name: "Lobby", icon: IoCallOutline, href: "/lobby",  },
  // { name: "Meet", icon: IoCall, href: "/meeting",  },
  // { name: "Chat", icon: BsTelegram, href: "/chat",  },
  // { name: "DM", icon: BsTelegram, href: "/dm",  },
  // { name: "Inbox", icon: BsTelegram, href: "/inbox",  },
];
export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
    // zIndex={1000}
    >
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        // size="full"
        // size={{ base: "md" }}
        // size={"sm"}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box
        height={"100%"}
        // pt={{base:"1em"}}
      >
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({
  onClose,
  ...rest
}: SidebarProps) => {
  const loadMore = () => {
    // Simulating loading more messages
    setTimeout(() => {}, 1000);
  };
  const { isOpen, onClose: onCloseConnect, onOpen } = useDisclosure();

  const ref = useRef();
  return (
    <Box
      borderRight="1px"
      w={{ base: "full", md: "full" }}
      pos="fixed"
      h="full"
      zIndex={999}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/" onClick={onClose}>
          <IconComponent
            src="/WUW_LOGO_TEXT_MASCOTTE.png"
            alt="WUW- Whatever You Want"
            size="70px"
          />
        </Link>
        <CloseButton
          onClick={onClose}
        />
      </Flex>
      <Box width={"100%"} gap={1}>
        {LinkItems.map((link, i: number) => (
          <Box key={i} width={"100%"} textAlign={"center"} onClick={onClose}>
            {link.isExternal ? (
              <ExternalStylizedButtonLink
                key={link.name}
                icon={link.icon}
                href={link.href}
                isExternal={link.isExternal}
              >
                {link.name}
              </ExternalStylizedButtonLink>
            ) : (
              <StylizedButtonLink
                key={link.name}
                icon={link.icon}
                href={link.href}
              >
                {link.name}
              </StylizedButtonLink>
            )}
          </Box>
        ))}
        {/* <AccountButton></AccountButton> */}
        <Box justifyContent={"baseline"}>
          <ConnectModal
            modalOpen={isOpen}
            onClose={onCloseConnect}
            onOpen={onOpen}
          />
          <CustomConnectButtonWallet></CustomConnectButtonWallet>
        </Box>
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  //   children: ReactNode;
  href: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const ref = useRef();
  const {
    isOpen,
    onOpen: onOpenConnectModal,
    onClose: onCloseConnectModal,
  } = useDisclosure();

  const account = useAccount();
  return (
    <Flex
      width="100%"
      alignItems="center"
      borderBottomWidth="1px"
      justifyContent={{ base: "space-between" }}
      // justifyContent={{ base:"space-evenly" }}
      // justifyContent={{ base:"space-around" }}
      // position={{base:"fixed"}}
      // zIndex={1000}
      // maxHeight={{ base: "110px", md: "130px" }}
      maxHeight={{ base: "80px", md: "90px" }}
      {...rest}
    >
      <Link href="/">
        <IconComponent
          ref={ref}
          // src="/WUW_transparent.png"
          src="/assets/WUW_logo_hackathon_partner_gang.png"
          alt="ToolFi Bot"
          size="70px"
        />
      </Link>

      <Box
        display={{ base: "none", md: "flex" }}
        gap={{ base: "0.1em", md: "0.3em" }}
        padding={{ base: "0.1em" }}
      >
        {LinkItemsDesktop.map((link, i: number) => (
          <Box key={i} width={"100%"} textAlign={"center"}>
            {link.isExternal ? (
              <ExternalStylizedButtonLink
                key={link.name}
                icon={link.icon}
                href={link.href}
                isExternal={link.isExternal}
              >
                {link.name}
              </ExternalStylizedButtonLink>
            ) : (
              <StylizedButtonLink
                key={link.name}
                icon={link.icon}
                href={link.href}
                isExternal={link.isExternal}
              >
                {link.name}
              </StylizedButtonLink>
            )}
          </Box>
        ))}
       
        <Box>
       
        </Box>
      </Box>
      <Box display={{ base: "flex", md: "none" }} gap="1em" padding="1em">
        
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
      </Box>

      <ModeToggle></ModeToggle>
    </Flex>
  );
};
