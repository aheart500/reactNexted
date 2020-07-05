import React from "react";
import "../styles/styles.scss";
import "../styles/pages/singleBlog.css";
import "../styles/components/loader.css";
import "../styles/pages/admin-login.css";
import "../styles/pages/admin.css";
import "../styles/pages/home.css";
import ThemeState from "../ThemeState";
import Meta from "../components/Meta";
const _app = ({ Component, pageProps }) => {
  return (
    <>
      <Meta
        title={pageProps.title}
        desc={pageProps.desc}
        keys={pageProps.keys}
      />
      <ThemeState>
        <Component {...pageProps} />
      </ThemeState>
    </>
  );
};

export default _app;
