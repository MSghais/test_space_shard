import { Button, Text } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
interface ILoginButton {
  isDisplayName?: boolean;
  isDisplayEmail?: boolean;
  textSignIn?: string;
}
export default function LoginBtn({ isDisplayEmail, textSignIn }: ILoginButton) {
  const { data: session } = useSession();

  let referral: string | undefined;
  if (typeof window !== "undefined") {
    referral = window?.localStorage?.getItem("referal_link");
  }
  console.log("referal", referral);
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
    <Button
      width={"100%"}
      onClick={() => {
        signIn();
      }}
    >
      {textSignIn ?? "Sign in"}
    </Button>
  );
}
