import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const dataPerMonth = [
  { name: "Jan", 월매출: 400, 월주문건수: 364 },
  { name: "Feb", 월매출: 600, 월주문건수: 432 },
  { name: "Mar", 월매출: 740, 월주문건수: 432 },
  { name: "Apr", 월매출: 330, 월주문건수: 732 },
  { name: "May", 월매출: 530, 월주문건수: 132 },
  { name: "Jun", 월매출: 640, 월주문건수: 632 },
  { name: "Jul", 월매출: 190, 월주문건수: 432 },
  { name: "Aug", 월매출: 260, 월주문건수: 132 },
  { name: "Sep", 월매출: 1100, 월주문건수: 732 },
  { name: "Oct", 월매출: 460, 월주문건수: 932 },
  { name: "Nov", 월매출: 960, 월주문건수: 532 },
  { name: "Dec", 월매출: 200, 월주문건수: 732 },
];

const dataPerYear = [
  { name: "2019", 연매출: 5000 },
  { name: "2020", 연매출: 6000 },
  { name: "2021", 연매출: 7000 },
  { name: "2022", 연매출: 8000 },
];

const dataPerDay = [
  { name: "01", 일매출: 50 },
  { name: "02", 일매출: 60 },
  { name: "03", 일매출: 70 },
  { name: "04", 일매출: 80 },
  { name: "05", 일매출: 90 },
  { name: "06", 일매출: 100 },
  { name: "07", 일매출: 110 },
  { name: "08", 일매출: 120 },
  { name: "09", 일매출: 130 },
  { name: "10", 일매출: 140 },
];
const MyBarSaleChart = () => {
  const [data, setData] = useState(dataPerMonth);
  const [xAxisKey, setXAxisKey] = useState("name");
  const [leftDataKey, setLeftDataKey] = useState("월매출");
  const [rightDataKey, setRightDataKey] = useState("월주문건수");

  const handleDataChange = type => {
    switch (type) {
      case "year":
        setData(dataPerYear);
        setXAxisKey("name");
        setLeftDataKey("연매출");
        setRightDataKey(null);
        break;
      case "month":
        setData(dataPerMonth);
        setXAxisKey("name");
        setLeftDataKey("월매출");
        setRightDataKey("월주문건수");
        break;
      case "day":
        setData(dataPerDay);
        setXAxisKey("name");
        setLeftDataKey("일매출");
        setRightDataKey(null);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="tabforsales">
        <ul className="tabforsalesUl">
          <li>
            <button
              className="btn btnforYearChart"
              onClick={() => handleDataChange("year")}
            >
              연별 매출
            </button>
          </li>
          <li>
            <button
              className="btn btnforMonthChart"
              onClick={() => handleDataChange("month")}
            >
              월별 매출
            </button>
          </li>
          <li>
            <button
              className="btn btnforDayChart"
              onClick={() => handleDataChange("day")}
            >
              일별 매출
            </button>
          </li>
        </ul>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey={xAxisKey} />
          <YAxis yAxisId="left" />
          {rightDataKey && <YAxis yAxisId="right" orientation="right" />}
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey={leftDataKey} fill="#8884d8">
            <LabelList dataKey={leftDataKey} position="top" />
          </Bar>
          {rightDataKey && (
            <Bar yAxisId="right" dataKey={rightDataKey} fill="#82ca9d">
              <LabelList dataKey={rightDataKey} position="top" />
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarSaleChart;
