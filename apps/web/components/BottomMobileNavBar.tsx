// components/MobileNavBar.tsx
import {
  Box,
  Flex,
  IconButton,
  Link as LinkChakra,
  Spacer,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiConversation, BiVideo } from "react-icons/bi";
import { BsQuestion } from "react-icons/bs";
import { FiHome, FiSearch, FiUser } from "react-icons/fi";
import { IoCreate } from "react-icons/io5";
import Link from "next/link";
import { CreateButtonFixed } from "./button/CreateButtonFixed";
const BottomMobileNavBar: React.FC = () => {
  let colorButton = "";
  let bgReverted = useColorModeValue("gray.300", "gray.900");
  let color = useColorModeValue("green.100", "green.100");
  return (
    <Flex
      justify="center" // Center-align the content horizontally
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      // bg="white"
      // boxShadow="md"
      bg={bgReverted}
      display={{ lg: "none" }}
      // p={2}
      zIndex="999"
    >
      <Stack
        direction="row"
        spacing={4}
        justify="center"
        // gap={{base:"0.25em"}}
        justifyContent={"space-around"}
        // size="32px"

        // display={"grid"}
        display={"flex"}
        // gridTemplateColumns={"repeat(max-content,1fr)"}
        // bg={useColorModeValue("white", "gray.900")}
        p={{ base: "0.7em", md: "1em" }}
        // rounded={{ base: "1xl" }}
      >
        {" "}
        {/* Center-align the Stack */}
        <Link href="/">
          <IconButton
            aria-label="Home"
            icon={<FiHome size={"16px"} />}
            size="32px"
            bg="transparent"
            // size="lg"
            // bg={bg}
            // bg={bgReverted}
            // colorScheme="gray.500"
            color="brand.primary"
            // color="green.700"
            // color="green.700"
          />
        </Link>
        <Link href="/create">
          <IconButton
            aria-label="Create"
            size="32px"
            icon={<IoCreate size={"16px"} />}
            // size="lg"
            // colorScheme="gray.500"
            // bg="brand.primary"
            color="brand.primary"

            // bg={bg}
          />
        </Link>
        {/* <Link>
          <IconButton
            aria-label="Search"
            icon={<FiSearch />}
            size="lg"
            colorScheme="gray.500"
          />
        </Link> */}
        <Link href="/explorer">
          <IconButton
            size="32px"
            aria-label="Search"
            icon={<BsQuestion size={"16px"} />}
            // size="lg"
            // colorScheme="gray.500"
            // colorScheme="gray.300"
            // bg="brand.primary"
            color="brand.primary"
          />
        </Link>
        {/* <Link href="/whatever">
          <IconButton
            aria-label="Search"
            icon={<BsQuestion />}
            // size="lg"
            // colorScheme="gray.500"
            // colorScheme="gray.300"
            bg="brand.primary"
          />
        </Link> */}
        <Link href="/dm">
          <IconButton
            aria-label="Create"
            icon={<BiConversation size={"16px"} />}
            size="32px"
            // size="lg"
            // colorScheme="gray.500"
            // bg="brand.primary"
            color="brand.primary"
          />
        </Link>
        {/* <Link href="/video">
          <IconButton
            aria-label="Video call"
            icon={<BiVideo />}
            // size="lg"
            // colorScheme="gray.500"
            bg="brand.primary"
          />
        </Link> */}
        <Link
          href="/my_profile"
          // size="22px"
        >
          <IconButton
            aria-label="Profile"
            // size="24px"
            size={"24px"}
            icon={<FiUser size={"16px"} />}
            color="brand.primary"

            // size="lg"
            // colorScheme="gray.500"
            // bg="brand.primary"
          />
        </Link>
      </Stack>
    </Flex>
  );
};

export default BottomMobileNavBar;
