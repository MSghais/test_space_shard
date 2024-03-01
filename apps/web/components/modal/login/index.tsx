import {
  Box,
  Text,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";

import { ENV_PUSH } from "../../../utils";
import { useSession } from "next-auth/react";

import LoginPanel from "../../auth/LoginPanel";
import Link from "next/link";
interface IAdminPanelGroup {
  modalOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const env = ENV_PUSH;
const ConnectModal = ({
  modalOpen,

  onClose,
  onOpen,
}: IAdminPanelGroup) => {
  const session = useSession();
  const color = useColorModeValue("gray.800", "gray.300");
  const bg = useColorModeValue("gray.300", "gray.800");

  return (
    <Box width={"100%"}>
      <Button
        onClick={onOpen}
        bg={{ base: "brand.primary" }}
        width={"100%"}
      >
        My account
      </Button>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        isOpen={modalOpen}
        onClose={() => onClose}
        size={"md"}
      >
        <ModalOverlay></ModalOverlay>
        <ModalContent 
        color={color} 
        bg={bg} 
        minH={{ base: "50vh" }}>
          <ModalHeader>Connect you</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>

            <Text>Connect you here via your Email, or Gmail/Discord.</Text>


            <Box
              py={{ base: "0.5em" }}
              display={{ base: "grid", lg: "flex" }}
              gap="0.3em"
            >
              {/* <Box>
                <MetamaskAuth></MetamaskAuth>
              </Box> */}
            </Box>

            <Box py={{ base: "0.5em" }}>
              <LoginPanel
                textSignIn="Sign with Google/Discord"
              ></LoginPanel>
           
            </Box>
            <Text>Check my profile</Text>
            <Button>
              <Link href="/my_profile">My profile</Link>
            </Button>

          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ConnectModal;
