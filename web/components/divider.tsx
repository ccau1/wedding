import { twCascade } from "@mariusmarais/tailwind-cascade";

interface DividerProps {
  vertical?: boolean;
  size?: string | number;
  className?: string;
}

const Divider = ({ vertical, size = "100%", className }: DividerProps) => {
  return (
    <div
      className={twCascade(
        `bg-gray-300`,
        vertical ? "mx-1 w-px" : "my-1 h-px",
        className
      )}
      style={{
        ...(vertical ? { height: size } : { width: size }),
      }}
    />
  );
};

export default Divider;
