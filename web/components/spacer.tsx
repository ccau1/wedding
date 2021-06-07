import React from "react";

interface SpacerProps {
  width?: number;
  height?: number;
}

const Spacer = ({ width, height }: SpacerProps) => (
  <div style={{ width, height }} />
);

export default Spacer;
