import { twCascade } from "@mariusmarais/tailwind-cascade";
import { CSSProperties, forwardRef } from "react";
import Button from "./button";
import styles from "./card.module.scss";

interface CardProps {
  title?: string;
  text?: string;
  actions?: Array<{
    text?: string;
    onClick?: (
      e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => void;
    className?: string;
  }>;
  className?: string;
  children?: React.ReactNode;
  image?: string;
  imageClassName?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      text,
      actions = [],
      className,
      children,
      image,
      imageClassName,
      onClick,
      style,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={twCascade(
          `bg-white rounded-lg px-4 py-8 shadow-lg overflow-hidden`,
          onClick && "cursor-pointer",
          className
        )}
        style={style}
        onClick={onClick}
        {...rest}
      >
        {image && (
          <div className="w-auto -mx-4 -mt-8 mb-2">
            <img
              src={image}
              className={twCascade(
                `w-full h-40 object-cover mb-2`,
                styles.image,
                imageClassName
              )}
            />
          </div>
        )}
        {title && <h5>{title}</h5>}
        {text && <p>{text}</p>}
        {children}
        {actions?.length > 0 && (
          <div className="flex flex-row mt-5">
            {actions.map((action, actionIndex) => (
              <Button
                key={actionIndex}
                onClick={(e) => {
                  e.preventDefault();
                  action.onClick?.(e);
                }}
                text={action.text}
                className={twCascade(
                  actionIndex > 0 && "ml-1",
                  action.className
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default Card;
