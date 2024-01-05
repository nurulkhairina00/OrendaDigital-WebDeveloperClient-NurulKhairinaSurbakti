import React, { useState } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Orenda Digital</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
