import { getCsrfToken, signIn, useSession } from "next-auth/react"
import { SiweMessage } from "siwe"
import { useAccount, useConnect, useSignMessage, useWalletClient } from "wagmi"
import { useEffect, useState } from "react"
import { Box, Button } from "@chakra-ui/react"
import { InjectedConnector } from "@wagmi/core"

function SiweLogin() {
  const { signMessageAsync } = useSignMessage()
  const chain = useAccount()?.chain;
  const account = useWalletClient()?.data?.account

  const { address, isConnected,  } = useAccount()
  const { connect } = useConnect({
  });
  const { data: session, status } = useSession()

  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected"
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      })
      const signature = await signMessageAsync({
        account:account,
        message: message.prepareMessage(),
      })
      signIn("ethereum", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      })
    } catch (error) {
      window.alert(error)
    }
  }

  useEffect(() => {
    console.log(isConnected);
    if (isConnected && !session) {
    //   handleLogin()
    }
  }, [isConnected])

  return (
    <Box>
      <Button
        onClick={(e) => {
          e.preventDefault()
          if (!isConnected) {
            connect()
          } else {
            handleLogin()
          }
        }}
      >
        Sign-in
      </Button>
    </Box>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}


export default SiweLogin