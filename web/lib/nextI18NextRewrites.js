const nextI18NextRewrites = (localeAlias) =>
  Object.keys(localeAlias).reduce(
    (arr, urlLocale) =>
      arr.concat([
        {
          source: `/${urlLocale}/:path*`,
          destination: `/${localeAlias[urlLocale]}/:path*`,
        },
      ]),
    []
  );

module.exports = { nextI18NextRewrites };
