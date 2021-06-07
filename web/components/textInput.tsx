import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useRef,
} from "react";
import styles from "./textInput.module.scss";

interface TextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  floatLabel?: boolean;
  name: string;
  error?: string;
  className?: string;
  inputClassName?: string;
}

const TextInput = ({
  name,
  value,
  onChange,
  label,
  floatLabel = true,
  error,
  className,
  inputClassName,
  ...rest
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative ${styles.container} ${className}`}>
      {(floatLabel || !value) && (
        <span
          className={`label absolute ${styles.label} ${
            floatLabel && value ? styles.labelFloat : ""
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {label || name}
        </span>
      )}
      <input
        ref={inputRef}
        className={`border-2 border-primary-200 p-2 rounded-md ${inputClassName}`}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <span className="text-red-500 block">{error}</span>}
    </div>
  );
};

export default TextInput;
