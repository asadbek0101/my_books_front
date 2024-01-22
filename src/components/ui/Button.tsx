import { ReactNode } from "react";
import cx from "classnames";
import "./assets/button.scss";

interface Props {
  readonly children: ReactNode;
  readonly className?: string;
  readonly type?: "button" | "submit" | "reset";
  readonly onClick?: () => void;
  readonly style?: any;
  readonly solidButton?: boolean;
  readonly loading?: boolean;
}

export default function Button({
  children,
  className,
  type = "button",
  onClick,
  style,
  solidButton = false,
  loading,
}: Props) {
  return (
    <button
      type={type}
      className={cx(className, "app-button", {
        solid_button: solidButton,
      })}
      onClick={onClick && onClick}
      style={style}
    >
      {loading && <span>Loading...</span>}
      {!loading && children}
    </button>
  );
}
