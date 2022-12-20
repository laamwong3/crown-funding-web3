import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import ColorMode from "../contexts/ColorMode";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import ContextManager from "../contexts/ContextManager";

const { provider, webSocketProvider } = configureChains(
  [bsc, bscTestnet],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Crown Funding Dapp</title>
        <meta name="description" content="crown funding dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <ContextManager>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ContextManager>
        </SessionProvider>
      </WagmiConfig>
    </>
  );
}
