"use client";
import { Analysis } from "@/types";
import Link from "next/link";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";

const CustomTooltip = ({ payload, label, active }: any) => {
  const dateLabel = new Date(label).toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  if (active) {
    const analysis = payload[0].payload;

    if (!analysis) {
      return (
        <div>
          <p className="label text-sm text-black/30">{dateLabel}</p>
          <p className="intro text-xl uppercase">No data</p>
        </div>
      );
    }
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    );
  }

  return null;
};

const HistoryChart = ({ data }: { data: Analysis[] }) => {
  if (!data.length) {
    return (
      <div className="flex justify-center items-center h-full w-full flex-col">
        <p className="text-2xl ">
          no data found, start journaling to see your mood history.
        </p>

        <Link
          href="/journal"
          className="inline-block bg-accent-500 text-primary-800 my-4 text-xl underline"
        >
          Start Journaling 📝
        </Link>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="updatedAt" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
