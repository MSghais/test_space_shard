import { IconButton, useColorMode, useColorModeValue , Box} from "@chakra-ui/react";
import { BsMoon, BsSun } from "react-icons/bs";

export const ToggleColor = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      onClick={toggleColorMode}
      aria-label="toggle dark mode"
    >
      {colorMode === "light" ? <BsMoon /> : <BsSun />}
    </Box>
  );
};
