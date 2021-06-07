import { twCascade } from "@mariusmarais/tailwind-cascade";
import { forwardRef } from "react";

interface ChipProps {
  text?: string;
  onClick?: () => void;
  onCloseClick?: () => void;
  enableClose?: boolean;
  className?: string;
  textClassName?: string;
  color?: string;
}

const Chip = forwardRef<HTMLAnchorElement, ChipProps>(
  (
    {
      text,
      onClick,
      onCloseClick,
      enableClose,
      className,
      textClassName,
      color = "primary",
    },
    ref
  ) => {
    return (
      <a
        ref={ref}
        onClick={onClick}
        className={twCascade(
          `flex justify-between items-center m-1 font-medium py-1 px-2 rounded-full text-primary-100 bg-${color}-600 border border-${color}-600`,
          onClick !== undefined && "cursor-pointer",
          className
        )}
      >
        <span
          className={twCascade(
            `text-xs font-normal leading-none max-w-full flex-initial whitespace-nowrap`,
            textClassName
          )}
        >
          {text}
        </span>
        {enableClose && (
          <div className="flex flex-auto flex-row-reverse">
            <a
              onClick={(ev) => {
                ev.stopPropagation();
                onCloseClick?.();
              }}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className={`feather feather-x cursor-pointer hover:text-${color}-400 rounded-full w-4 h-4 ml-2`}
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </a>
          </div>
        )}
      </a>
    );
  }
);

export default Chip;
