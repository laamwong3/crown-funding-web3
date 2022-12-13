import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ConfigProvider, Layout, theme } from "antd";

const { defaultSeed, darkAlgorithm, defaultAlgorithm } = theme;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Crown Funding Dapp</title>
        <meta name="description" content="crown funding dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}
