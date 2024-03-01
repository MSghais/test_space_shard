import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Text,
  useColorModeValue,
  useDisclosure,
  Box,
  HStack,
  Drawer,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { LinkItemProps } from "../../layout/SidebarWithHeader";
import StylizedButtonLink, { ExternalStylizedButtonLink } from "../NavItem";

// import { LinksItems } from "../../types";
// export default function MenuDropdown({
export default function MenuBar({
  title,
  href,
  isSubmenu,
  linksSubmenu,
  icon,
}: // titleDropdown,
// colorChange,
// onClose,
LinkItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack
    // zIndex={1000}
    // p="1em"
    >
      <Menu
      // zIndex={"1000"}

      // isOpen={isOpen}
      >
        {({ isOpen }) => (
          <>
            <Flex>
              {/* <Button
                onClick={onOpen}
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                width={"100%"}
                gap="0.5em"
                // onClick={onOpen}

              > */}
              <MenuButton
                as={Button}
                onClick={onOpen}
                display="inline-flex"
                alignItems="center"
                width={"100%"}
                // disp
                // bg={"gray.900"}
              >
                {icon && <Icon as={icon} marginRight={2} />}
                {title}
              </MenuButton>

              {/* </Button> */}
            </Flex>

            {/* <MenuButton
            // as={"a"}
            // isActive={isOpen}
            // as={Button}
            onClick={onOpen}
            rel="noopener noreferrer"
            display="inline-flex"
            alignItems="center"
            width={"100%"}
            // rightIcon={<ChevronDownIcon />}
            >
              {title}
              <Text
              >
                {title ?? "Start trading"}
              </Text>
            </MenuButton> */}
            <MenuList
              p="1em"
              gap="1em"
              zIndex={1000}

              // bg={useColorModeValue('white', 'gray.900')}
              // borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              {isSubmenu &&
                linksSubmenu &&
                linksSubmenu.length > 0 &&
                linksSubmenu.map((link, i) => {
                  return (
                    <Box p={{ sm: "0.5em" }}>
                      {link?.isSubmenu ? (
                        <MenuBar {...link}>{link.title}</MenuBar>
                      ) : link.isExternal ? (
                        <ExternalStylizedButtonLink
                          key={link.name}
                          icon={link.icon}
                          href={link.href}
                          isExternal={link.isExternal}
                          title={link?.title}
                        >
                          {link.name}
                        </ExternalStylizedButtonLink>
                      ) : (
                        <StylizedButtonLink
                          key={link.name}
                          icon={link.icon}
                          href={link.href}
                          isExternal={link.isExternal}
                          title={link.title}
                        >
                          {link.name}
                        </StylizedButtonLink>
                      )}
                      {/* <MenuItem
                        fontSize={{ base: "17px", md: "21px" }}
                        as="button"
                        onClick={onClose}
                        key={i}
                      >
                        <Link
                          href={link.href}
                        >
                          {link.title}
                        </Link>
                      </MenuItem> */}
                    </Box>
                  );
                })}
            </MenuList>
          </>
        )}
      </Menu>
    </HStack>
  );
}
