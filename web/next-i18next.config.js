const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "zh_hk",
    locales: ["en", "zh_cn", "zh_hk"],
  },
  partialBundledLanguages: true,
  localeSubpaths: {
    en_us: "en",
    en_ca: "en",
    zh: "zh_hk",
  },
  localePath: path.resolve("./public/locales"),
};
