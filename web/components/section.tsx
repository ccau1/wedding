import React from "react";
import classNames from "../lib/classNames";
import styles from "./section.module.scss";

interface SectionProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  className?: string;
  contentClassName?: string;
  boxed?: boolean;
  horizontalPadding?: boolean;
}

const Section = ({
  children,
  style,
  className,
  contentStyle,
  contentClassName,
  horizontalPadding,
  boxed,
}: SectionProps) => {
  return (
    <section className={classNames(styles.section, className)} style={style}>
      <div
        className={classNames(
          styles.sectionContent,
          boxed && styles.sectionContentBoxed,
          contentClassName,
          horizontalPadding && styles.sectionContentHorizontalPadding
        )}
        style={contentStyle}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
