import { ethers } from "ethers";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useAccount, useSignMessage, useWalletClient } from "wagmi";
import { CustomConnectButtonWallet } from "../button/CustomConnectButtonWallet";
import { Box, Button, Text } from "@chakra-ui/react";
import { SiweMessage } from "siwe";

// Fix typescript errors for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function MetamaskAuth() {
  const session = useSession()
  const account = useWalletClient()?.data?.account;
  const address = useAccount()?.address;
  const chain = useAccount()?.chain;
  const publicAddress = useAccount()?.address;
  const {
    data: signMessageData,
    error,
    // isLoading,
    signMessage,
    variables,
    signMessageAsync,
  } = useSignMessage();
  // const { chain } = account;

  const onSignInWithCrypto = async () => {
    try {
      console.log("sign");

      console.log("signedMessage", signMessageData);

      const nonce = await getCsrfToken();
      const callbackUrl = "/protected";

      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });

      // Sign the received nonce
      console.log("nonce", nonce);
      console.log("signedMessage", signMessageData);

      const signature = await signMessageAsync({
        account:account,
        message: message.prepareMessage(),
      });

      // Use NextAuth to sign in with our address and the nonce
      await signIn("crypto", {
        publicAddress,
        signMessageData,
        message: JSON.stringify(message),
        // callbackUrl: "/",
        signature,
        // callbackUrl,
      });
    } catch (e) {
      window.alert("Error with signing, please try again.");
      console.log("error sign", e);
    }
  };
  return (
    <Box>
      {/* <Text>
        After clicking the button you will be prompted to connect your wallet
        with this site, then you will need to sign a nonce (random hex string)
        to prove you own the account.
      </Text> */}

      <CustomConnectButtonWallet
        isHiddenBalance={true}
        isViewAddress={false}
        // displayBalance={false}
      ></CustomConnectButtonWallet>

      {session?.status != "authenticated" && 
          <Button my={{ base: "0.5em" }} onClick={onSignInWithCrypto}>
          Sign in and Connect
        </Button>
      }
  
    </Box>
  );
}

// This function requests a nonce then signs it, proving that
//  the user owns the public address they are using
// async function onSignInWithCrypto(address:string, sign:() => void) {
//   try {
//     // if (!window.ethereum) {
//     //   window.alert("Please install MetaMask first.");
//     //   return;
//     // }

//     // Get the wallet provider, the signer and address
//     // const provider = new ethers.BrowserProvider(window.ethereum);
//     // const signer = await provider.getSigner();
//     // const publicAddress = await signer.getAddress();
//     const publicAddress = useAccount()?.address
//     // const publicAddress = await signer.getAddress();

//     const { data: signMessageData, error, isLoading, signMessage, variables } = useSignMessage()
//     console.log("sign")

//     // Send the public address to generate a nonce associates with our account
//     const response = await fetch("/api/auth/crypto/generateNonce", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         publicAddress,
//       }),
//     });
//     const responseData = await response.json();
//     console.log("responseData",responseData)
//     const nonce = responseData.nonce
//     // Sign the received nonce
//     // const signedNonce = await signer.signMessage(responseData.nonce);

//     // let signedNonce = await signMessage({ message: nonce })
//     let signedNonce = await sign({ message: nonce })

//     console.log("signedNonce",signedNonce)

//     // Use NextAuth to sign in with our address and the nonce
//     await signIn("crypto", {
//       publicAddress,
//       signedNonce,
//       callbackUrl: "/",
//     });
//   } catch(e) {
//     window.alert("Error with signing, please try again.",);
//     console.log("error sign", e)
//   }
// }
