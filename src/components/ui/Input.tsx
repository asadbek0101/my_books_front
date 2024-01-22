import "./assets/input-control.scss";

import cx from "classnames";
import React, { useMemo, useState } from "react";

import { InputProps as NativeInputProps, SizeType } from "../../api/appDTO";
import EyeIcon from "../icons/EyeIcon";
import CloseEye from "../icons/CloseEye";

export interface InputProps
  extends Omit<NativeInputProps, "size" | "placeholder" | "className"> {
  readonly width?: number;
  readonly height?: number;
  readonly size?: SizeType;
  readonly maxWidth?: number;
  readonly hintText?: string;
  readonly minWidth?: number;
  readonly hasError?: boolean;
  readonly className?: string;
  readonly editable?: boolean;
  readonly inputClassName?: string;
  readonly label?: string;
  readonly placeholder?: string;
  readonly passwordIcon?: "visible" | "hidden";
  readonly checked?: boolean;
  readonly withCheckBox?: boolean;
}

export function Input({
  size = SizeType.Medium,
  width,
  height,
  label,
  hintText,
  maxWidth,
  minWidth,
  hasError,
  disabled,
  editable = true,
  className,
  placeholder,
  inputClassName,
  checked,
  withCheckBox = false,
  passwordIcon = "visible",
  ...props
}: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div
      className={cx("d-flex flex-column input-control", className)}
      style={{
        width: `${width}px`,
        maxWidth: `${maxWidth}px`,
        minWidth: `${minWidth}px`,
      }}
    >
      {Boolean(label) && (
        <label
          className={cx("text-ellipsis mb-1", { "text-danger": hasError })}
        >
          {label}
        </label>
      )}
      <div
        className={cx("input-box", {
          "with-checkbox": withCheckBox,
        })}
      >
        {Boolean(withCheckBox) && (
          <div className="checkbox-input-control">
            <input
              type="checkbox"
              className="border border-gray-light text-gray"
              checked={checked}
            />
          </div>
        )}
        <input
          autoComplete="off"
          {...props}
          type={passwordVisible ? "text" : props.type}
          contentEditable={editable}
          placeholder={placeholder}
          disabled={disabled || !editable}
          style={{ height: `${height}px` }}
          className={cx("lh-6 form-control", inputClassName, {
            "is-invalid": hasError,
            "form-control-sm": size === SizeType.Small,
            "form-control-lg": size === SizeType.Large,
            "border border-gray-light text-gray": !hasError,
            "disabled-editing-input": !editable && !disabled,
          })}
        />
        {props.type === "password" && passwordIcon === "visible" ? (
          <div
            className="eye-icon"
            onClick={() => setPasswordVisible((prev) => !prev)}
          >
            {passwordVisible ? (
              <CloseEye color="#000" />
            ) : (
              <EyeIcon color="#000" />
            )}
          </div>
        ) : (
          <span />
        )}
      </div>

      {/* {Boolean(hintText) && (
        <span className={cx({ "text-danger": hasError })}>{hintText}</span>
      )} */}
    </div>
  );
}
