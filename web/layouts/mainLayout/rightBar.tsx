import useTheme from "@hooks/useTheme";
import React from "react";

interface RightBarProps {
  children?: React.ReactNode;
}

const RightBar = ({ children }: RightBarProps) => {
  const theme = useTheme();
  if (!theme.layout.rightBarShow || !children) return null;
  return (
    <div
      className={`w-1/5 bg-white h-full ${
        theme.layout.rightBarFixed ? "fixed top-0 right-0" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default RightBar;
