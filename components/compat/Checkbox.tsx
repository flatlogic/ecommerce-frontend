"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  onChange?: (checked: boolean) => void;
  size?: number;
  style?: CSSProperties;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  borderStyle?: CSSProperties["borderStyle"];
  icon?: ReactNode;
}

export default function Checkbox({
  checked,
  defaultChecked = false,
  disabled,
  label,
  onChange,
  size = 16,
  style,
  borderColor = "#D7C629",
  borderWidth = 2,
  borderRadius = 5,
  borderStyle = "solid",
  icon,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked ?? internalChecked;

  return (
    <label
      className="d-inline-flex align-items-center"
      style={{
        marginBottom: "0.5rem",
        cursor: disabled ? "default" : "pointer",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          ...style,
          alignItems: "center",
          borderColor,
          borderRadius,
          borderStyle,
          borderWidth,
          display: "flex",
          flex: `0 0 ${size}px`,
          height: size,
          justifyContent: "center",
          width: size,
        }}
      >
        {isChecked ? icon : null}
      </span>
      <input
        type="checkbox"
        className="visually-hidden"
        checked={isChecked}
        disabled={disabled}
        onChange={(event) => {
          if (checked === undefined)
            setInternalChecked(event.currentTarget.checked);
          onChange?.(event.currentTarget.checked);
        }}
      />
      {label ? <span style={{ marginLeft: 5 }}>{label}</span> : null}
    </label>
  );
}
