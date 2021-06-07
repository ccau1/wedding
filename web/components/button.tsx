import React, { forwardRef } from "react";
import { twCascade } from "@mariusmarais/tailwind-cascade";

interface ButtonProps {
  text?: string;
  secondary?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  small?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { onClick, type, text, secondary, className, small, autoFocus, disabled },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        autoFocus={autoFocus}
        className={twCascade(
          secondary ? "bg-yellow-500" : "bg-blue-500",
          `text-white font-medium pb-2 pt-1 px-5 outline-none`,
          small ? "px-3 py-1 text-sm" : "",
          className
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
);

export default Button;
