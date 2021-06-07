const classNames = (...classNames: Array<string | string[]>) => {
  return classNames
    .reduce<string[]>((cArr, c) => {
      if (Array.isArray(c)) {
        return [...cArr, ...c];
      } else if (typeof c === "string") {
        return cArr.concat(c);
      }
      return cArr;
    }, [])
    .join(" ");
};

export default classNames;
