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
} from "@chakra-ui/react";
import CreateViewComponent from "../../views/CreateViewComponent";
interface IAdminPanelGroup {
  modalOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const CreateModal = ({
  modalOpen,
  onClose,
  onOpen,
}: IAdminPanelGroup) => {

  return (
    <Box>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        isOpen={modalOpen}
        // open={modalOpen}
        onClose={() => onClose}
      // className='flex xl:hidden'
      >
        <ModalOverlay></ModalOverlay>
        <ModalContent

          minH={{ base: "50vh" }}

        >
          <ModalHeader>Create whatever you want</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <CreateViewComponent></CreateViewComponent>

          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateModal;
