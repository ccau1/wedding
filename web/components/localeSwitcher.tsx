import React from "react";
import { useRouter } from "next/dist/client/router";
import styles from "./localeSwitcher.module.scss";
import { twCascade } from "@mariusmarais/tailwind-cascade";

const localeMap = [
  {
    l: "en",
    name: "EN",
  },
  {
    l: "zh_cn",
    name: "简体",
  },
  {
    l: "zh_hk",
    name: "繁體",
  },
];

const LocaleSwitcher = () => {
  const { locale, locales, asPath, push } = useRouter();
  return (
    <div className="grid grid-flow-col gap-4 px-4">
      {locales
        .sort((a, b) => a.localeCompare(b))
        .map((loc) => (
          <a
            key={loc}
            className={twCascade(
              "whitespace-nowrap",
              locale === loc ? "text-primary-500" : "text-gray-700",
              styles.localeItem
            )}
            onClick={() => push(asPath, asPath, { locale: loc })}
          >
            {localeMap.find((l) => l.l === loc)?.name || "[N/A]"}
          </a>
        ))}
    </div>
  );
};

export default LocaleSwitcher;
