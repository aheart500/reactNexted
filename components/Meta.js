import Head from "next/head";
const Meta = ({ title, desc }) => (
  <Head>
    <meta
      name="google-site-verification"
      content="YuD3YwsOTJk9v9zC9HGz3UMPy5xt8VNrCDxPznahAZY"
    />
    <meta name="robots" content="index,follow" />
    <title>{title}</title>
    <meta name="description" content={desc} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta name="og:description" property="og:description" content={desc} />
    <meta property="og:site_name" content="snappeso" />
    <meta property="og:url" content="https://snappeso.com" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={desc} />
    <meta name="twitter:site" content="" />
    <meta name="twitter:creator" content="" />
    <link rel="icon" type="image/png" href="/logotype.svg" />
    <link rel="apple-touch-icon" href="/logotype.svg" />
    <meta property="og:image" content="/logotype.svg" />
    <meta name="twitter:image" content="/logotype.svg" />
  </Head>
);
export default Meta;
