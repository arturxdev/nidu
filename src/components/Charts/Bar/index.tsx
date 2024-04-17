"use client"
import { generateFormatNumber } from '@/utils/generalHelper';
import { BarList } from '@tremor/react';

type Data = {
  name: string,
  value: number,
}
type Props = {
  data: Data[]
}
export default function BarChart(props: Props) {
  const barColors = ["#37A2EA", "#FF6285", "#4AC1C0", "#FE9E41", "#9966FF", "#FFCC56", "#C8CACF"]
  const colors = ['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald']
  let data = []
  for (let i = 0; i < props.data.length; i++) {
    data.push({ ...props.data[i], color: colors[i] })
  }
  return (
    <BarList
      data={data}
      className="px-5"
      valueFormatter={(value: any) => `$${generateFormatNumber(value)}`}
    />
  );
}
