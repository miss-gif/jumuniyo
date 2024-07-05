import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dataPerMonth = [
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

const MyLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={dataPerMonth}>
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="월매출"
          stroke="#8884d8"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="월주문건수"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MyLineChart;
