import {
  Avatar,
  Box,
  Card,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "db_mongo";
import { formatTimeAgo } from "../../utils/formats";

interface IProfileView {
  isLoadingProfileDb: boolean;
  profile: User;
}
const ProfileView = ({ isLoadingProfileDb, profile }: IProfileView) => {
  return (
    <Box>
      <Stack

        p={{ base: "1em" }}
        py={{ base: "0.5em" }}
        borderRadius={{ base: "7px" }}
      >
        <Text fontSize={{ base: "19px", md: "21px", lg: "23px" }}>
          You can manage your profile here.
        </Text>

        {isLoadingProfileDb && (
          <Box>
            <Text>Loading multi profile...</Text>
            <Spinner></Spinner>
          </Box>
        )}

        {profile && (
          <Box>
            <Text>{formatTimeAgo(new Date(profile.createdAt))}</Text>
            <Avatar src={profile?.avatar}></Avatar>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default ProfileView;
