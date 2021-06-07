import React from "react";
import { twCascade } from "@mariusmarais/tailwind-cascade";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (newVal: boolean) => void;
  text?: string;
  className?: string;
  inputClassName?: string;
  textClassName?: string;
  lg?: boolean;
}

const Checkbox = ({
  checked,
  onChange,
  text,
  className,
  inputClassName,
  textClassName,
  lg,
}: CheckboxProps) => {
  return (
    <a onClick={() => onChange?.(!checked)} className={twCascade(className)}>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className={twCascade(
            "cursor-pointer",
            `form-checkbox h-${lg ? 6 : 4} w-${
              lg ? 6 : 4
            } text-primary-600 transition-colors`,
            inputClassName
          )}
          checked={checked}
          onChange={() => null}
        />
        <span className={twCascade("ml-2 text-gray-700", textClassName)}>
          {text}
        </span>
      </label>
    </a>
  );
};

export default Checkbox;
