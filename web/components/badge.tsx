import { twCascade } from "@mariusmarais/tailwind-cascade";

interface BadgeProps {
  text: string | number;
  className?: string;
  bgColor?: string;
  color?: string;
  onClick?: () => void;
}

const Badge = ({ text, bgColor, color, className, onClick }: BadgeProps) => {
  return (
    <span
      onClick={onClick}
      className={twCascade(
        "py-0.5 px-2 bg-red-500 rounded-full text-white",
        bgColor && `bg-${bgColor}-500`,
        color && `text-${color}-500`,
        className
      )}
      style={{ fontSize: 10 }}
    >
      {text}
    </span>
  );
};

export default Badge;
