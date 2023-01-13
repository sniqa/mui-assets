import { Pie, PieConfig } from "@ant-design/plots";
import { useMemo } from "react";

interface PieChartProps {
  data: Record<string, any>[];
  title: string;
  className?: string;
}

const PieChart = ({ data, title, className }: PieChartProps) => {
  const config = useMemo<PieConfig>(
    () => ({
      appendPadding: 10,
      data,
      angleField: "value",
      colorField: "type",
      radius: 0.75,
      label: {
        type: "spider",
        labelHeight: 58,
        content: "{name}\n{value}",
      },
      interactions: [
        {
          type: "element-selected",
        },
        {
          type: "element-active",
        },
      ],
    }),
    [data]
  );

  return (
    <div className={className}>
      <div className="w-full text-center text-2xl pt-4">{title}</div>
      <Pie {...config} />
    </div>
  );
};

export default PieChart;
