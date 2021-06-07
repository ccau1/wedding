import { twCascade } from "@mariusmarais/tailwind-cascade";
import React, { CSSProperties, ReactNode } from "react";

interface MenuItemProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
}

function Toggle({
  children,
  active,
  onClick,
  style,
  className,
}: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={twCascade(
        `hover:text-primary-500 py-2 px-4 rounded inline-flex items-center cursor-pointer`,
        className
      )}
    >
      <span
        className={twCascade(
          "whitespace-nowrap",
          active ? "text-primary-500" : "text-gray-700"
        )}
      >
        {children}
      </span>
    </div>
  );
}

function Content({ children }: { children: ReactNode }) {
  return (
    <ul className="dropdown-content absolute hidden cursor-pointer">
      {children}
    </ul>
  );
}

function Item({ children, onClick, style }: MenuItemProps) {
  return (
    <li>
      <a
        onClick={onClick}
        className="bg-gray-200 active:bg-gray-600 hover:bg-gray-400 py-2 px-4 block whitespace-nowrap"
        style={style}
      >
        {children}
      </a>
    </li>
  );
}

interface SubMenuProps {
  children: ReactNode;
  toggle: ReactNode;
}

function SubMenu({ toggle, children }: SubMenuProps) {
  return (
    <div className="dropdown right-0 relative">
      {toggle}
      <ul className="dropdown-content absolute hidden text-gray-700 top-0 left-full">
        {children}
      </ul>
    </div>
  );
}

export function Menu({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="dropdown inline-block relative">{children}</div>

      <style global jsx>
        {`
          .dropdown:hover > .dropdown-content {
            display: block;
          }
        `}
      </style>
    </>
  );
}

Menu.Toggle = Toggle;
Menu.Content = Content;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
