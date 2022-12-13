import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import ColorMode from "../contexts/ColorMode";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Crown Funding Dapp</title>
        <meta name="description" content="crown funding dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ColorMode>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorMode>
    </>
  );
}
