import React, { useEffect, useRef, useState } from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { PlainObject } from '@mongodb-js/charts-embed-dom/dist/declarations/src/types';
type ChartProps = {
  filter: object;
  chartId: string;
  height: string;
  width: string;
}
const Chart = ({ filter, chartId, height, width }: ChartProps) => {
  const sdk = new ChartsEmbedSDK({ baseUrl: 'https://charts.mongodb.com/charts-project-0-cevgc' });
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({ chartId: chartId, filter: filter as PlainObject, height: height, width: width, theme: "light", showAttribution: false }));

  useEffect(() => {
    if (!chartDiv.current) return;
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {
    if (rendered) {
      chart.setFilter(filter as PlainObject).catch(err => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);

  return <div className="chart h-full" ref={chartDiv} />;
};

export default Chart;
