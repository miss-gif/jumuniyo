import React, { useEffect, useState } from "react";
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

const Statistics = () => {
  const [monthSalesData, setMonthSalesData] = useState([]);
  const [dailySalesData, setDailySalesData] = useState([]);
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [view, setView] = useState("month"); // view 상태 추가

  useEffect(() => {
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
          `/api/stat/month_sales?year=${year}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const monthOrderResponse = await axios.get(
          `/api/stat/month_order_count?year=${year}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log("Month Sales Response: ", monthSalesResponse.data);
        console.log("Month Order Response: ", monthOrderResponse.data);

        if (
          Array.isArray(monthSalesResponse.data.data) &&
          Array.isArray(monthOrderResponse.data.data)
        ) {
          const combinedMonthData = monthSalesResponse.data.data.map(
            (item, index) => ({
              month: item.month,
              sales: item.sales,
              orders: monthOrderResponse.data.data[index]?.orders || 0,
            }),
          );

          setMonthSalesData(combinedMonthData);
        } else {
          console.error("Month Sales or Order response is not an array");
        }
      } catch (error) {
        setError("데이터를 가져오는 중 에러가 발생했습니다.");
        console.error("데이터 가져오기 에러:", error);
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
          `/api/stat/daily_sales?month=${yearMonth}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const dailyOrderResponse = await axios.get(
          `/api/stat/daily_order_count?month=${yearMonth}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log("Daily Sales Response: ", dailySalesResponse.data);
        console.log("Daily Order Response: ", dailyOrderResponse.data);

        if (
          Array.isArray(dailySalesResponse.data.data) &&
          Array.isArray(dailyOrderResponse.data.data)
        ) {
          const combinedDailyData = dailySalesResponse.data.data.map(
            (item, index) => ({
              day: item.day,
              sales: item.sales,
              orders: dailyOrderResponse.data.data[index]?.orders || 0,
            }),
          );

          setDailySalesData(combinedDailyData);
        } else {
          console.error("Daily Sales or Order response is not an array");
        }
      } catch (error) {
        setError("데이터를 가져오는 중 에러가 발생했습니다.");
        console.error("데이터 가져오기 에러:", error);
      }
    };

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
      <div>
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
            selected={selectedYear}
            onChange={handleYearChange}
            dateFormat="yyyy"
            showYearPicker
          />
          <h3>월 매출 및 주문 수</h3>
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
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="월 매출" />
              <Bar dataKey="orders" fill="#82ca9d" name="월 주문 수" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {view === "day" && (
        <div>
          <h3>연도와 월 선택</h3>
          <DatePicker
            selected={selectedMonth}
            onChange={handleMonthChange}
            dateFormat="yyyy-MM"
            showMonthYearPicker
          />
          <h3>일 매출 및 주문 수</h3>
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
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="일 매출" />
              <Bar dataKey="orders" fill="#82ca9d" name="일 주문 수" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Statistics;
