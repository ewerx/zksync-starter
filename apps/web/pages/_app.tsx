import "../styles/globals.scss";
import "ui/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import type { AppProps } from "next/app";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { zkSync, mainnet, zkSyncTestnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [
    zkSync,
    mainnet,
    zkSyncTestnet,
    goerli,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
    //   ? [zkSyncTestnet, goerli]
    //   : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "zkSync Greeter",
  // projectId: "YOUR_PROJECT_ID", // needed for WalletConnect -- get from https://cloud.walletconnect.com/
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        initialChain={zkSyncTestnet}
        modalSize="compact"
        showRecentTransactions={true}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
