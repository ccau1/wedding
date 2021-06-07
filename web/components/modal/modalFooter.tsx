import Button from "components/button";
import { twCascade } from "@mariusmarais/tailwind-cascade";

interface ModalFooterProps {
  actions?: Array<{
    color?: string;
    onClick?: () => void;
    text: string;
    className?: string;
    autoFocus?: boolean;
  }>;
}

const ModalFooter = ({ actions = [] }: ModalFooterProps) => {
  return (
    <div className="flex flex-row justify-between -mx-4 -mb-4 p-2 border-t border-gray-200 mt-4 min-h-10">
      <div className="flex flex-row justify-start" />
      <div className="flex flex-row justify-end">
        {actions.map((action, actionIndex) => (
          <Button
            key={`action_${actionIndex}`}
            text={action.text}
            onClick={action.onClick}
            className={twCascade(
              "text-white ml-2",
              `bg-${action.color || "primary"}-500`,
              action.className
            )}
            autoFocus={action.autoFocus}
          />
        ))}
      </div>
    </div>
  );
};

export default ModalFooter;
