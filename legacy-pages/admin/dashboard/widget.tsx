import React from "react";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";

import MoneyIcon from "public/images/e-commerce/admin/widgets/moneyIcon";
import s from "./Dashboard.module.scss";

interface SimpleLineProps {
  color: string;
  title: string;
  subtitle: string;
  value?: number;
}

const SimpleLine = ({ color, title, subtitle }: SimpleLineProps) => {
  function getRandomData(
    length: number,
    min = 0,
    max = 16,
    multiplier = 15,
    maxDiff = 5,
  ) {
    const array = Array.from({ length });
    let lastValue: number | undefined;

    return array.map(() => {
      let randomValue = Math.floor(Math.random() * multiplier + 1);

      while (
        randomValue <= min ||
        randomValue >= max ||
        (lastValue && randomValue - lastValue > maxDiff)
      ) {
        randomValue = Math.floor(Math.random() * multiplier + 1);
      }

      lastValue = randomValue;

      return { value: randomValue };
    });
  }
  const randomData = React.useMemo(() => getRandomData(10), []);
  const tooltipProps = {
    itemStyle: { background: "transparent", color: "#ffffff" },
    wrapperStyle: {
      background: "rgba(0,0,0,.6)",
      borderRadius: 2,
      border: "none",
    },
    contentStyle: { background: "transparent", border: "none" },
    labelStyle: { background: "transparent", color: "rgba(255,255,255,.8)" },
    offset: 0,
    allowEscapeViewBox: { x: true, y: true },
    coordinate: { x: -400, y: -240 },
    payload: [{ name: "05-01", value: 12, unit: "kg" }],
  } as unknown as React.ComponentProps<typeof Tooltip>;
  return (
    <div className={s.dashboardWidgetWrapper}>
      <h4 className={s.widgetTitle}>{title}</h4>
      <span className={s.widgetSubtitle}>{subtitle}</span>
      <div>
        <MoneyIcon className={s.moneyIcon ?? ""} />
        <ResponsiveContainer height={90} width="100%">
          <AreaChart data={randomData}>
            <Area
              type="natural"
              dataKey="value"
              stroke={color}
              fill={color}
              strokeWidth={3}
              fillOpacity="0.1"
            />
            <Tooltip {...tooltipProps} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export async function getServerSideProps(_context: unknown) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default SimpleLine;
