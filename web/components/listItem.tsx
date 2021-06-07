import React, { forwardRef } from "react";
import { twCascade } from "@mariusmarais/tailwind-cascade";
import Divider from "./divider";
import { motion } from "framer-motion";
import Image from "next/image";

interface ListItemProps {
  icon?: string;
  iconSize?: number;
  title?: string;
  subtitle?: string;
  left?: React.FunctionComponent<{}>;
  right?: React.FunctionComponent<{}>;
  rightText?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  topDivider?: boolean;
  bottomDivider?: boolean;
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  rightTextClassName?: string;
  dividerClassName?: string;
  active?: boolean;
  activeColor?: string;
}

const ListItem = forwardRef<HTMLAnchorElement, ListItemProps>(
  (
    {
      icon,
      iconSize = 50,
      title,
      subtitle,
      left,
      right,
      rightText,
      onClick,
      topDivider,
      bottomDivider,
      className,
      imageClassName,
      titleClassName,
      subtitleClassName,
      rightTextClassName,
      dividerClassName,
      active,
      activeColor,
    },
    ref
  ) => {
    return (
      <>
        {topDivider && <Divider className={dividerClassName} />}
        <a
          ref={ref}
          onClick={onClick}
          className={twCascade(
            "flex items-center justify-between py-4 px-2 relative",
            onClick !== undefined && "cursor-pointer",
            className
          )}
        >
          {active && (
            <motion.div
              layoutId="list-item-highlighter"
              className="absolute top-0 left-0 h-full w-full rounded-md"
              initial={false}
              animate={{ backgroundColor: activeColor }}
              style={{ zIndex: 0 }}
            />
          )}
          {left && left({})}
          {icon && (
            <div className="h-full z-10 flex items-center mr-2">
              <Image
                className={twCascade("w-12 h-12 rounded-full", imageClassName)}
                src={icon}
                width={iconSize}
                height={iconSize}
              />
            </div>
          )}
          <div className="flex-1 pl-2 z-10">
            {title !== undefined && (
              <div
                className={twCascade(
                  "text-gray-700 font-semibold",
                  titleClassName
                )}
              >
                {title}
              </div>
            )}
            {subtitle !== undefined && (
              <div
                className={twCascade(
                  "text-gray-600 font-thin",
                  subtitleClassName
                )}
              >
                {subtitle}
              </div>
            )}
          </div>
          {rightText && (
            <div
              className={twCascade("text-primary-500 z-10", rightTextClassName)}
            >
              {rightText}
            </div>
          )}
          {right && right({})}
        </a>
        {bottomDivider && <Divider className={dividerClassName} />}
      </>
    );
  }
);

export default ListItem;
