const path = require("path");
const { i18n, localeSubpaths } = require("./next-i18next.config.js");
const { nextI18NextRewrites } = require("./lib/nextI18NextRewrites.js");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["handlebars-loader", "style-loader", "css-loader"],
      },
    ],
  },
  // webpack loader that will handle SVG imports
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      // issuer: {
      //   test: /\.(js|ts)x?$/,
      // },
      use: ["@svgr/webpack"],
    });

    return config;
  },
  future: {
    webpack5: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["backendstoragedev.blob.core.windows.net"],
  },
  i18n,
  async rewrites() {
    return [...nextI18NextRewrites(localeSubpaths)];
  },
};
