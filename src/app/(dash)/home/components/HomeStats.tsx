"use client";
import { useGetCharts } from "@/services/hooks/useGetCharts";
import React from "react";

const HomeStats = () => {
  const { resume, isLoading, isError } = useGetCharts(
    "kgemiv715asjklruekm298fatzzzj7kwgcki9gnm",
    "2024-04-01",
    "2024-04-15"
  );

  return <div>HomeStats</div>;
};

export default HomeStats;
