import { Box, useDisclosure } from "@chakra-ui/react"
import { CreateButtonFixed } from "../button/CreateButtonFixed"
import CreateModal from "./create"

export const ModalCreateView = () => {
    const { isOpen: isOpenCreate, onClose: onCloseCreate, onOpen: onOpenCreate } = useDisclosure()

    return (
        <Box>
            <CreateButtonFixed
                onOpen={onOpenCreate}
                modalOpen={isOpenCreate}
                onClose={onCloseCreate}
            ></CreateButtonFixed>
            <CreateModal
                onOpen={onOpenCreate}
                modalOpen={isOpenCreate}
                onClose={onCloseCreate}
            ></CreateModal>
        </Box>

    )
}