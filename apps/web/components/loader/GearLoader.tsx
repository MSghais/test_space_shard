import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import styles from "./Gear.module.css";

const GearLoader: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      height={"100%"}
      width={"100%"}
      alignItems={"baseline"}
      alignContent={"baseline"}
      gap={{ base: "0.5em", md: "1em" }}
    >
      <Box className={styles.gear_loader}></Box>
    </Flex>
  );
};

export default GearLoader;
