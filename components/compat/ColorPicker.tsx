"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  className?: string;
  defaultColor?: string;
  onChange?: (value: { color: string }) => void;
}

export default function ColorPicker({
  className,
  defaultColor = "#333333",
  onChange,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(defaultColor);
  return (
    <li
      className={className}
      style={{ position: "relative", background: color }}
    >
      <button
        type="button"
        aria-label="Choose custom color"
        onClick={() => setOpen((value) => !value)}
        style={{ position: "absolute", inset: 0, opacity: 0 }}
      />
      {open && (
        <div
          style={{ position: "absolute", zIndex: 20, top: "100%", right: 0 }}
        >
          <HexColorPicker
            color={color}
            onChange={(next) => {
              setColor(next);
              onChange?.({ color: next });
            }}
          />
        </div>
      )}
    </li>
  );
}
