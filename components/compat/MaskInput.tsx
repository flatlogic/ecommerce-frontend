"use client";

import { IMaskInput } from "react-imask";
import type { ChangeEvent, ComponentType, InputHTMLAttributes } from "react";

interface MaskInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  mask?: string;
  maskChar?: string;
  alwaysShowMask?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function MaskInput({
  mask = "0000-0000-0000-0000",
  onChange,
  maskChar: _maskChar,
  alwaysShowMask: _alwaysShowMask,
  ...props
}: MaskInputProps) {
  void _maskChar;
  void _alwaysShowMask;
  const ModernMaskInput = IMaskInput as unknown as ComponentType<
    Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
      mask: string;
      definitions: Record<string, RegExp>;
      onAccept: (value: string) => void;
    }
  >;
  return (
    <ModernMaskInput
      {...props}
      mask={mask.replaceAll("0", "0")}
      definitions={{ "0": /\d/ }}
      onAccept={(value) => {
        const event = {
          target: { value },
          currentTarget: { value },
        } as ChangeEvent<HTMLInputElement>;
        onChange?.(event);
      }}
    />
  );
}
