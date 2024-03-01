import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";
import LoginBtn from "./LoginBtn";

import { useCallback, useState } from "react";
import { BsDiscord, BsGoogle } from "react-icons/bs";
import CredentialsLogin from "./CredentialsLogin";
interface ILoginButton {
  isDisplayName?: boolean;
  isDisplayEmail?: boolean;
  textSignIn?: string;
}
export default function FarcasterPanel({
  isDisplayEmail,
  textSignIn,
}: ILoginButton) {
  const { data: session } = useSession();
  const [error, setError] = useState(false);

  let referral: string | undefined;
  if (typeof window !== "undefined") {
    referral = window?.localStorage?.getItem("referal_link");
  }

  return (
    <Box>
      <Box py={{ base: "0.25em" }} width={"100%"}></Box>
      
      <Button
        width={"100%"}
        onClick={() => {
            signIn();
        }}
      >
        {textSignIn ?? "Sign in"}
      </Button>

      <CredentialsLogin></CredentialsLogin>

      <Box display={{ base: "flex" }} gap={{ base: "0.25em" }}>
        <Button w={"100%"} onClick={() => signIn("google")}>
          <BsGoogle></BsGoogle>
        </Button>
        <Button w={"100%"} bg="brand.discord" onClick={() => signIn("discord")}>
          <BsDiscord></BsDiscord>
        </Button>
      </Box>
    </Box>
  );
}
