import {
  Avatar,
  Box,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "db_mongo";
import { useEffect } from "react";
import { formatRelativeTime, formatTimeAgo } from "../../utils/formats";

interface IProfileView {
  isLoadingProfileDb: boolean;
  profile?: User;
  address?: string;
}
const ProfileViewPublic = ({
  isLoadingProfileDb,
  profile,
  address,
}: IProfileView) => {
  return (
    <Box>
      <Stack
   
        borderColor={{ base: "green.300" }}
        border={"4px"}
        p={{ base: "1em" }}
      >
        
        {profile && (
          <Box>
             <Avatar src={profile?.avatar}>
              
              </Avatar>

            {profile?.createdAt &&

              <Text>{formatTimeAgo(new Date(profile?.createdAt))}</Text>
            }
              <Text>{profile?.name}</Text>
         

          </Box>
        )}


      </Stack>
    </Box>
  );
};

export default ProfileViewPublic;
