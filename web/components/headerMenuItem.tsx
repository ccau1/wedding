import { twCascade } from "@mariusmarais/tailwind-cascade";
import { useRouter } from "next/router";
import styles from "./headerMenuItem.module.scss";

interface HeaderMenuItemProps {
  text: string;
  icon?: string;
  href?: string;
  asPath?: string;
  locale?: string;
  onClick?: () => void;
  subMenu?: HeaderMenuItemProps[];
  subMenuPosition?: "bottom" | "left" | "right" | "top";
  active?: boolean;
  disabled?: boolean;
}

const HeaderMenuItem = ({
  text,
  icon,
  href,
  asPath,
  locale,
  onClick,
  subMenu,
  subMenuPosition = "bottom",
  active,
  disabled,
}: HeaderMenuItemProps) => {
  const router = useRouter();
  const onClickInner = () => {
    if (href) {
      router.push(href, asPath, { locale });
    } else if (subMenu) {
      // it has subMenu, trigger open/close
    } else {
      onClick?.();
    }
  };

  const subMenuContainerClassName = () => {
    let className = "";
    switch (subMenuPosition) {
      case "bottom":
        className += "";
        break;
      case "right":
        className += " pr-0";
        break;
    }
    return className;
  };

  return (
    <div className={`py-2 px-2 ${styles.container}`}>
      <a
        className={twCascade(
          `flex items-center px-2`,
          active && styles.itemActive,
          disabled
            ? "text-gray-300 hover:text-gray-300 cursor-default"
            : "cursor-pointer hover:text-primary-500"
        )}
        {...(disabled ? {} : { onClick: onClickInner })}
      >
        {text}
      </a>
      {subMenu?.length > 0 && (
        <div
          className={`${
            styles.child
          } child absolute bg-white rounded-md border-gray-50 border-2 pr-0 ${subMenuContainerClassName()}`}
        >
          {subMenu.map((subMenuItem, subMenuItemIndex) => (
            <HeaderMenuItem
              key={subMenuItemIndex}
              {...subMenuItem}
              subMenuPosition={"right"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderMenuItem;
