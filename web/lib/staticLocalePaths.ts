export default (paths: Array<{ params: { id: string } }>, locales: string[]) =>
  locales.reduce(
    (localeArr, locale) =>
      localeArr.concat(paths.map((p) => ({ ...p, locale }))),
    paths
  );
