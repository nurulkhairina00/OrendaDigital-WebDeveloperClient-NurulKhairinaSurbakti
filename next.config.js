// next.config.js
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_PATH: process.env.API_PATH,
    API_PORT: process.env.API_PORT,
  },
};
