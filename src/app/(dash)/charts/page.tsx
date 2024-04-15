"use client"
import Chart from "@/components/Chart";
import dayjs from "dayjs";
import { useState } from "react";
export default function Lab() {
  const [filter, setFilter] = useState({
    $and: [
      { userId: "k29za4s25k2vybk" },
      { date: { $gte: dayjs("2024-04-02").toDate(), $lte: dayjs("2024-04-20").toDate() } }
    ]
  });
  return (
    <div className="w-full min-h-screen flex p-5 gap-6">
      <div className=" w-1/3 h-96">
        <Chart height={''} width={''} filter={filter} chartId={'660ed376-45c3-4219-854a-c633293a0505'} />
      </div>
      <div className=" w-1/3 h-96">
        <Chart height={''} width={''} filter={filter} chartId={'660ed3fd-36de-4eba-87ef-2959d8b1ec15'} />
      </div>
      <div className=" w-1/3 h-96">
        <Chart height={''} width={''} filter={filter} chartId={'660ed423-dc84-456f-802c-6a801fa6caa4'} />
      </div>
    </div>
  );
}
