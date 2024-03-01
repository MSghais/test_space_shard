import { Box, Button, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { EMAIL_REGEX } from "../../utils";
interface ILoginButton {
  isDisplayName?: boolean;
  isDisplayEmail?: boolean;
  textSignIn?: string;
}
export default function CredentialsLogin({ isDisplayEmail, textSignIn }: ILoginButton) {
  const { data: session } = useSession();
  const toast = useToast()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  let referral: string | undefined;
  if (typeof window !== "undefined") {
    referral = window?.localStorage?.getItem("referal_link");
  }
  console.log("referal", referral);

  const handleSign = async () => {

    if(!EMAIL_REGEX.test(form?.email)) {
      toast({
        title:"Please enter a valide email"
      })
      return;
    }
  
    const callbackUrl = "/protected";
    signIn("credentials", {
      email: form?.email,
      username: form?.username,
      password: form?.password,
      redirect: false,
      callbackUrl,
    });
  }
  if (session) {
    return (
      <>
        {isDisplayEmail && (
          <Text>
            Signed in as {session?.user?.email} <br />
          </Text>
        )}

        <Button width={"100%"} onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <Box>
      <FormLabel>Email</FormLabel>
      <Input
        my={{ base: "0.25em", md: "0.5em" }}
        py={{ base: "0.5em" }}
        type="email"
        onChange={(e) => {
          setForm({ ...form, email: e.target.value, username: e.target.value });
        }}
        placeholder="Email or Username"
      ></Input>

      <Input
        my={{ base: "0.25em", md: "0.5em" }}
        py={{ base: "0.5em" }}
        type="password"
        onChange={(e) => {
          setForm({ ...form, password: e.target.value });
        }}
        placeholder="Password"
      ></Input>
      <Button
        width={"100%"}
        onClick={() => {
        handleSign()
        }}
      >
        {textSignIn ?? "Sign in"}
      </Button>
    </Box>
  );
}
