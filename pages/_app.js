import React from "react";
import "../styles/styles.scss";
import "../styles/pages/singleBlog.css";
import "../styles/components/loader.css";
import "../styles/pages/admin-login.css";
import "../styles/pages/admin.css";
import "../styles/pages/home.css";
import ThemeState from "../ThemeState";
import Head from "next/head";
const _app = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />

        <link rel="shortcut icon" href="/logotype.svg" />
        <meta
          name="google-site-verification"
          content="YuD3YwsOTJk9v9zC9HGz3UMPy5xt8VNrCDxPznahAZY"
        />
        <meta name="robots" content="index,follow" />
      </Head>
      <ThemeState>
        <Component {...pageProps} />
      </ThemeState>
    </>
  );
};

export default _app;
