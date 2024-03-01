import { Text } from "@chakra-ui/react";

interface ITextSubtitleContainer {
  title: string;
  align?: string;
}
export const TextSubtitleContainer = ({
  title,
  align,
}: ITextSubtitleContainer) => {
  return (
    <Text
      // textAlign={{ base: align ?? "center" }}
      fontSize={{ base: "25px", md: "29px", lg: "31px" }}
    >
      {title}
    </Text>
  );
};
