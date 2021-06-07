import React from "react";
import Head from "next/head";
import styles from "./layout.module.scss";
import classNames from "../../lib/classNames";
import Header from "./header";
import Content from "./content";

export const siteTitle = "Next.js Boilerplate";

interface LayoutProps {
  leftBar?: React.ReactNode;
  rightBar?: React.ReactNode;
  contentHeader?: React.ReactNode;
  children?: React.ReactNode;
  headerRight?: React.ReactNode;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

const Layout = ({
  children,
  leftBar,
  rightBar,
  contentHeader,
  headerRight,
  contentClassName,
  contentStyle,
}: LayoutProps) => {
  return (
    <div
      className={classNames(
        styles.container,
        "font-light flex flex-col flex-1 h-full"
      )}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header headerRight={headerRight} />
      <Content
        children={children}
        leftBar={leftBar}
        rightBar={rightBar}
        contentHeader={contentHeader}
        mainClassName={contentClassName}
        mainStyle={contentStyle}
      />
    </div>
  );
};

export default Layout;
