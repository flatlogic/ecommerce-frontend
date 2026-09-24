"use client";

import { Range, getTrackBackground } from "react-range";

interface RangeValue {
  min: number;
  max: number;
}
interface InputRangeProps {
  minValue?: number;
  maxValue?: number;
  step?: number;
  value: RangeValue;
  onChange: (value: RangeValue) => void;
  formatLabel?: (value: number) => string;
}

export default function InputRange({
  minValue = 0,
  maxValue = 1500,
  step = 1,
  value,
  onChange,
  formatLabel,
}: InputRangeProps) {
  const values = [value.min, value.max];
  const format = (rangeValue: number) =>
    formatLabel?.(rangeValue) ?? String(rangeValue);
  const valuePercent = (rangeValue: number) =>
    ((rangeValue - minValue) / (maxValue - minValue)) * 100;

  return (
    <div
      className="input-range"
      style={{ height: "1rem", position: "relative", width: "100%" }}
    >
      <Range
        min={minValue}
        max={maxValue}
        step={step}
        values={values}
        onChange={([min = minValue, max = maxValue]) => onChange({ min, max })}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="input-range__track input-range__track--background"
            style={{
              ...props.style,
              background: getTrackBackground({
                values,
                colors: ["#eeeeee", "#bd744c", "#eeeeee"],
                min: minValue,
                max: maxValue,
              }),
              borderRadius: "0.3rem",
              height: "0.3rem",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: "100%",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            key={props.key}
            aria-label={index === 0 ? "Minimum price" : "Maximum price"}
            className="input-range__slider"
            style={{
              ...props.style,
              backgroundColor: "#bd744c",
              border: "1px solid #bd744c",
              borderRadius: "100%",
              height: 10,
              margin: 0,
              marginLeft: "calc(5px - 0.2rem)",
              outline: "none",
              width: 10,
            }}
          />
        )}
      />
      {values.map((rangeValue, index) => (
        <span
          className="input-range__label input-range__label--value"
          key={`${index}-${rangeValue}`}
          style={{
            color: "#aaaaaa",
            fontFamily: '"Helvetica Neue", san-serif',
            fontSize: "0.8rem",
            left: `${valuePercent(rangeValue)}%`,
            lineHeight: 1.5,
            position: "absolute",
            top: "1.45rem",
            transform: index === 0 ? "none" : "translateX(-100%)",
            whiteSpace: "nowrap",
          }}
        >
          {format(rangeValue)}
        </span>
      ))}
    </div>
  );
}
