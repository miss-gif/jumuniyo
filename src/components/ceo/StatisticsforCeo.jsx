import React, { useState, useEffect } from "react";
import axios from "axios";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const StatisticsforCeo = () => {
  const [monthSalesData, setMonthSalesData] = useState([]);
  const [dailySalesData, setDailySalesData] = useState([]);
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [view, setView] = useState("month");

  const fetchMonthData = async () => {
    try {
      const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      const accessToken = getCookie("accessToken");

      if (!accessToken) {
        // Handle no access token case
        return;
      }

      const year = format(selectedYear, "yyyy");

      const monthSalesResponse = await axios.get(
        `/api/owner/stat/month_sales?date=${year}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const monthOrderResponse = await axios.get(
        `/api/owner/stat/month_order_count?date=${year}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (
        Array.isArray(monthSalesResponse.data.resultData) &&
        Array.isArray(monthOrderResponse.data.resultData)
      ) {
        const combinedMonthData = monthSalesResponse.data.resultData.map(
          item => {
            const orderItem = monthOrderResponse.data.resultData.find(
              order => order.createdAt === item.createdAt,
            );

            return {
              month: item.createdAt,
              sales: parseInt(item.monthSales, 10),
              orders: orderItem ? parseInt(orderItem.monthOrderCount, 10) : 0,
            };
          },
        );

        setMonthSalesData(combinedMonthData);
      }
    } catch (error) {
      setError("데이터를 가져오는 중 에러가 발생했습니다.");
    }
  };

  const fetchDailyData = async () => {
    try {
      const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      const accessToken = getCookie("accessToken");

      if (!accessToken) {
        // Handle no access token case
        return;
      }

      const yearMonth = format(selectedMonth, "yyyy-MM");

      const dailySalesResponse = await axios.get(
        `/api/owner/stat/daily_sales?date=${yearMonth}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const dailyOrderResponse = await axios.get(
        `/api/owner/stat/daily_order_count?date=${yearMonth}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (
        Array.isArray(dailySalesResponse.data.resultData) &&
        Array.isArray(dailyOrderResponse.data.resultData)
      ) {
        const combinedDailyData = dailySalesResponse.data.resultData.map(
          item => {
            const orderItem = dailyOrderResponse.data.resultData.find(
              order => order.createdAt === item.createdAt,
            );

            return {
              day: item.createdAt,
              sales: parseInt(item.dailySales, 10),
              orders:
                orderItem && orderItem.dailyOrderCountDto
                  ? parseInt(orderItem.dailyOrderCountDto, 10)
                  : 0,
            };
          },
        );

        setDailySalesData(combinedDailyData);
      }
    } catch (error) {
      setError("데이터를 가져오는 중 에러가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (view === "month") {
      fetchMonthData();
    } else if (view === "day") {
      fetchDailyData();
    }
  }, [selectedYear, selectedMonth, view]);

  const handleYearChange = date => {
    setSelectedYear(date);
  };

  const handleMonthChange = date => {
    setSelectedMonth(date);
  };

  const handleViewChange = view => {
    setView(view);
  };

  return (
    <div className="statistics">
      <h2>가게 통계</h2>
      {error && <p>{error}</p>}
      <div className="buttonforstatistics">
        <button className="btn" onClick={() => handleViewChange("month")}>
          월 매출 및 주문 수 보기
        </button>
        <button className="btn" onClick={() => handleViewChange("day")}>
          일 매출 및 주문 수 보기
        </button>
      </div>
      {view === "month" && (
        <div>
          <h3>연도 선택</h3>
          <DatePicker
            className="datepicker"
            selected={selectedYear}
            onChange={handleYearChange}
            dateFormat="yyyy"
            showYearPicker
          />
          <h3 className="selected-unit">월 단위</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={monthSalesData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="sales"
                fill="#8884d8"
                name="월 매출"
              />
              <Bar
                yAxisId="right"
                dataKey="orders"
                fill="#82ca9d"
                name="월 주문 수"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {view === "day" && (
        <div>
          <h3>연 월 선택</h3>
          <DatePicker
            className="datepicker"
            selected={selectedMonth}
            onChange={handleMonthChange}
            dateFormat="yyyy-MM"
            showMonthYearPicker
          />
          <h3 className="selected-unit">일 단위</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={dailySalesData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="sales"
                fill="#8884d8"
                name="일 매출"
              />
              <Bar
                yAxisId="right"
                dataKey="orders"
                fill="#82ca9d"
                name="일 주문 수"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StatisticsforCeo;
