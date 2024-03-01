"use client";

import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import Layout from "../layout/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../store";
import theme from "../theme";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { Session } from "next-auth";
import {
  goerli,
  sepolia,
  scrollTestnet,
  polygonZkEvmTestnet,
  baseGoerli,
  optimismSepolia,
  optimismGoerli,
  filecoin,
  bscTestnet,
  arbitrum,
  mainnet,
  optimism,
  polygon,
  arbitrumGoerli,
  arbitrumSepolia,
  polygonMumbai,
  Chain,
} from "wagmi/chains";
import { SessionProvider, useSession } from "next-auth/react";
import { I18nextProvider } from "react-i18next";
import { configureChains } from "@wagmi/core";
import { createConfig, http, WagmiProvider } from "wagmi";
import { StarknetProvider } from "../components/starknet/StarknetProvider";

function ScrollToTop() {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return null;
}

const mantleTestnet: Chain = {
  id: 5001,
  name: "Mantle testnet",
  // network: "MantleTestnet",
  // iconUrl: '/assets/mantle.png',
  // iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: "Mantle",
    symbol: "MNT ",
  },
  rpcUrls: {
    public: { http: ["https://rpc.testnet.mantle.xyz"] },
    default: { http: ["https://rpc.testnet.mantle.xyz"] },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.testnet.mantle.xyz" },
    etherscan: { name: "Explorer", url: "https://explorer.testnet.mantle.xyz" },
  },
  testnet: true,
};

const scrollSepoliaTestnet: Chain = {
  id: 534351,
  name: "Scroll Sepolia Testnet",
  // network: "Scroll Sepolia Testnet",
  // iconUrl: '/assets/scroll.svg',
  // iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH ",
  },
  rpcUrls: {
    public: { http: ["https://sepolia-rpc.scroll.io"] },
    default: { http: ["https://sepolia-rpc.scroll.io"] },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://sepolia.scrollscan.dev" },
    etherscan: { name: "Explorer", url: "https://sepolia.scrollscan.dev" },
  },
  testnet: true,
};

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "WUW-WhateverYouWant RainbowKit App",
  wallets: [...wallets],
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
  chains: [
    goerli,
    sepolia,
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <StarknetProvider>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                  <Layout>
                    <ScrollToTop></ScrollToTop>
                    <Component {...pageProps} />
                  </Layout>
                </RainbowKitProvider>
              </QueryClientProvider>
            </WagmiProvider>
          </StarknetProvider>
        </Provider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
