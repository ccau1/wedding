import { twCascade } from "@mariusmarais/tailwind-cascade";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoCloseOutline, IoArrowDown } from "react-icons/io5";

interface AlertProps {
  text?: string;
  className?: string;
  type?: "danger" | "success" | "info";
  onCloseClick?: () => void;
  initialCollapse?: boolean;
  collapsible?: boolean;
  content?: string;
}

const Alert = ({
  text,
  type,
  className,
  content,
  initialCollapse,
  collapsible,
  onCloseClick,
}: AlertProps) => {
  let color = "red";
  switch (type) {
    case "success":
      color = "green";
      break;
    case "info":
      color = "blue";
      break;
    case "danger":
    default:
      color = "red";
      break;
  }

  const [isCollapsedContent, setIsCollapsedContent] = useState(
    initialCollapse ?? false
  );

  return (
    <div
      className={twCascade(
        `bg-${color}-100 border border-${color}-400 text-${color}-500 p-2 rounded-md`,
        className
      )}
    >
      <div
        className={twCascade(
          `flex flex-row justify-between items-center`,
          content && collapsible && "cursor-pointer"
        )}
        onClick={() => setIsCollapsedContent(!isCollapsedContent)}
      >
        <div className="flex flex-row items-center">
          {collapsible && (
            <IoArrowDown
              size={20}
              className={twCascade(
                `mr-2 transform transition-transform`,
                collapsible && isCollapsedContent ? "-rotate-90" : ""
              )}
            />
          )}
          <p>{text}</p>
        </div>
        {onCloseClick && (
          <IoCloseOutline
            size={30}
            className={`p-0.5 hover:bg-${color}-200 cursor-pointer rounded-sm`}
            onClick={onCloseClick}
          />
        )}
      </div>
      {content && (
        <motion.div
          variants={{
            hidden: { height: 0 },
            show: { height: "auto" },
          }}
          animate={collapsible && isCollapsedContent ? "hidden" : "show"}
          className={`overflow-hidden text-${color}-800`}
        >
          <p className={`bg-${color}-50 p-3 mt-2 rounded-md`}>{content}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Alert;
