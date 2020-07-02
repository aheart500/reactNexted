const isProd = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa");

module.exports = withPWA({
  api: {
    bodyParser: false,
  },
  pwa: {
    disable: !isProd,
    dest: "public",
  },
});
