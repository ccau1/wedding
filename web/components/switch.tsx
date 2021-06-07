import { twCascade } from "@mariusmarais/tailwind-cascade";

interface SwitchProps {
  text?: string;
  textPosition?: "left" | "right";
  value: boolean;
  onChange: (newVal: boolean) => void;
  className?: string;
  fullWidth?: boolean;
}

const Switch = ({
  text,
  textPosition = "left",
  value,
  onChange,
  className,
  fullWidth,
}: SwitchProps) => {
  return (
    <a
      className={twCascade(
        "flex flex-row items-center cursor-pointer",
        fullWidth && "justify-between",
        className
      )}
      onClick={() => onChange(!value)}
    >
      {textPosition === "left" && text && (
        <p className={twCascade("mr-2", textPosition)}>{text}</p>
      )}
      <div
        className={twCascade(
          "w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out",
          value && "bg-green-400"
        )}
      >
        <div
          className={twCascade(
            "bg-white w-8 h-6 rounded-full shadow-md transform duration-300 ease-in-out",
            value && "translate-x-6"
          )}
        />
      </div>
      {textPosition === "right" && text && (
        <p className={twCascade("mr-2", textPosition)}>{text}</p>
      )}
    </a>
  );
};

export default Switch;
