import useTheme from "@hooks/useTheme";
import React from "react";

interface LeftBarProps {
  children?: React.ReactNode;
}

const LeftBar = ({ children }: LeftBarProps) => {
  const theme = useTheme();
  if (!theme.layout.leftBarShow || !children) return null;
  return (
    <div
      className={`w-52 bg-white h-full ${
        theme.layout.leftBarFixed ? "fixed top-0 left-0" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default LeftBar;
