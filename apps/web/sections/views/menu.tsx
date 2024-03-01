import { Box } from "@chakra-ui/react"
import { ButtonLink, ButtonLinkBasic, ButtonLinkBrand } from "../../components/button";

const MenuButtonsView = () => {
  return (
    <Box>
      <Box
        px={{ base: "1em" }}
        display={"grid"}
        gridTemplateColumns={{ base: "repeat(2,1fr)" }}
        gap={{ base: "5%" }}
      >
        <ButtonLinkBrand href="/projects" title="Projects" />

        <ButtonLinkBrand href="/meetings" title="Stream and meet" />

        <ButtonLinkBrand href="/feed" title="Feeds" />

        <ButtonLinkBrand href="/quests" title="Quests" />
      </Box>
    </Box>
  );
};

export default MenuButtonsView;
