// components/ListBoxCard.tsx
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import React from "react";

interface ListBoxCardProps {
  username: string;
  message: string;
  avatarUrl: string;
  active: boolean;
}

const ChatCardHorizontal: React.FC<ListBoxCardProps> = ({
  username,
  message,
  avatarUrl,
  active,
}) => {
  return (
    <Box
      p={2}
      width="200px" // Set the width of each card
      borderWidth="1px"
      borderRadius="md"
      borderColor={active ? "blue.300" : "gray.300"}
      bg={active ? "blue.50" : "white"}
      boxShadow={active ? "md" : "none"}
      cursor="pointer"
      _hover={{
        bg: "blue.50",
        borderColor: "blue.300",
        boxShadow: "md",
      }}
    >
      <Flex alignItems="center" mb={2}>
        <Avatar
          src={avatarUrl}
          // alt={username}
          size="sm"
          mr={2}
        />
        <Text fontWeight="bold">{username}</Text>
      </Flex>
      <Text noOfLines={2} fontSize="sm">
        {message}
      </Text>
    </Box>
  );
};

export default ChatCardHorizontal;
