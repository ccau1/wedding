import { motion } from "framer-motion";
import React from "react";
import Section from "../../components/section";
import useTheme from "../../@hooks/useTheme";
import RightBar from "./rightBar";
import LeftBar from "./leftBar";
import styles from "./layout.module.scss";
import { twCascade } from "@mariusmarais/tailwind-cascade";

interface ContentProps {
  leftBar?: React.ReactNode;
  rightBar?: React.ReactNode;
  contentHeader?: React.ReactNode;
  children?: React.ReactNode;
  mainClassName?: string;
  mainStyle?: React.CSSProperties;
}

const Content = ({
  children,
  leftBar,
  rightBar,
  mainClassName,
  mainStyle,
  contentHeader,
}: ContentProps) => {
  const theme = useTheme();
  return (
    <Section
      boxed={theme.layout.contentBoxed}
      className="h-full"
      contentClassName="flex flex-row h-full items-start"
    >
      <LeftBar children={leftBar} />
      <div
        className={twCascade(
          "flex flex-col flex-1 h-full overflow-x-auto",
          styles.content
        )}
        style={mainStyle}
      >
        {contentHeader}
        <motion.div
          className={"flex flex-1"}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
            delay: 0.1,
            duration: 0.5,
          }}
          initial={{
            transform: `translate(0px, 50px)`,
            opacity: 0,
          }}
          animate={{
            transform: `translate(0px, 0px)`,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <main
            className={twCascade(
              `flex-1 max-h-full overflow-y-auto`,
              mainClassName
            )}
          >
            {children}
          </main>
        </motion.div>
      </div>
      <RightBar children={rightBar} />
    </Section>
  );
};
export default Content;
