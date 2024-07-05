import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", 월매출: 400, 월주문건수: 2400 },
  { name: "Feb", 월매출: 300, 월주문건수: 1398 },
  { name: "Mar", 월매출: 300, 월주문건수: 1398 },
  { name: "Apr", 월매출: 300, 월주문건수: 1398 },
  { name: "May", 월매출: 300, 월주문건수: 1398 },
  { name: "Jun", 월매출: 300, 월주문건수: 1398 },
  { name: "Jul", 월매출: 300, 월주문건수: 1398 },
  { name: "Aug", 월매출: 300, 월주문건수: 1398 },
  { name: "Sep", 월매출: 300, 월주문건수: 1398 },
  { name: "Oct", 월매출: 300, 월주문건수: 1398 },
  { name: "Nov", 월매출: 300, 월주문건수: 1398 },
  { name: "Dec", 월매출: 300, 월주문건수: 1398 },
];

const MyBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="월매출" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="월주문건수" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
