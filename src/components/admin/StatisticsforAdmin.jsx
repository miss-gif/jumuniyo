import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useSelector } from "react-redux";

const StatisticsforAdmin = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([]);
  const [showMonthly, setShowMonthly] = useState(true);
  const [showSales, setShowSales] = useState(false);

  const accessToken = useSelector(state => state.user.accessToken);

  const fetchMonthlyData = async year => {
    try {
      const responseSignUp = await axios.get(
        `/api/admin/stat/month_sign_up_count?date=${year}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const responseSignOut = await axios.get(
        `/api/admin/stat/month_sign_out_count?date=${year}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (
        responseSignUp.data.statusCode === 1 &&
        responseSignOut.data.statusCode === 1
      ) {
        const signUpData = responseSignUp.data.resultData.map(item => ({
          createdAt: item.createdAt,
          monthSignUpCount: parseInt(item.monthSignUpCount, 10),
        }));

        const signOutData = responseSignOut.data.resultData.map(item => ({
          createdAt: item.createdAt,
          monthSignOutCount: parseInt(item.monthSignOutCount, 10),
        }));

        const combinedData = signUpData.map(item => {
          const signOutItem = signOutData.find(
            outItem => outItem.createdAt === item.createdAt,
          );
          return {
            ...item,
            monthSignOutCount: signOutItem ? signOutItem.monthSignOutCount : 0,
          };
        });

        setData(combinedData);
      } else {
        console.error("API Error: ", responseSignUp.data.resultMsg);
      }
    } catch (error) {
      console.error("Fetching data failed: ", error);
    }
  };

  const fetchDailyData = async (year, month) => {
    try {
      const formattedMonth = month < 10 ? `0${month}` : month;
      const date = `${year}-${formattedMonth}`;

      const responseSignUp = await axios.get(
        `/api/admin/stat/daily_sign_up_count?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const responseSignOut = await axios.get(
        `/api/admin/stat/daily_sign_out_count?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (
        responseSignUp.data.statusCode === 1 &&
        responseSignOut.data.statusCode === 1
      ) {
        const signUpData = responseSignUp.data.resultData.map(item => ({
          date: item.createdAt,
          daySignUpCount: parseInt(item.dailySignUpCount, 10),
        }));

        const signOutData = responseSignOut.data.resultData.map(item => ({
          date: item.createdAt,
          daySignOutCount: parseInt(item.dailySignOutCount, 10),
        }));

        const combinedData = signUpData.map(item => {
          const signOutItem = signOutData.find(
            outItem => outItem.date === item.date,
          );
          return {
            ...item,
            daySignOutCount: signOutItem ? signOutItem.daySignOutCount : 0,
          };
        });

        setData(combinedData);
      } else {
        console.error("API Error: ", responseSignUp.data.resultMsg);
      }
    } catch (error) {
      console.error("Fetching data failed: ", error);
    }
  };

  const fetchMonthlySalesData = async year => {
    try {
      const responseSales = await axios.get(
        `/api/admin/stat/month_sales?date=${year}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const responseOrders = await axios.get(
        `/api/admin/stat/month_order_count?date=${year}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (
        responseSales.data.statusCode === 1 &&
        responseOrders.data.statusCode === 1
      ) {
        const salesData = responseSales.data.resultData.map(item => ({
          createdAt: item.createdAt,
          monthSales: parseFloat(item.monthSales),
        }));

        const ordersData = responseOrders.data.resultData.map(item => ({
          createdAt: item.createdAt,
          monthOrders: parseInt(item.monthOrderCount, 10),
        }));

        const combinedData = salesData.map(item => {
          const orderItem = ordersData.find(
            ordItem => ordItem.createdAt === item.createdAt,
          );
          return {
            ...item,
            monthOrders: orderItem ? orderItem.monthOrders : 0,
          };
        });

        setData(combinedData);
      } else {
        console.error("API Error: ", responseSales.data.resultMsg);
      }
    } catch (error) {
      console.error("Fetching data failed: ", error);
    }
  };

  const fetchDailySalesData = async (year, month) => {
    try {
      const formattedMonth = month < 10 ? `0${month}` : month;
      const date = `${year}-${formattedMonth}`;

      const responseSales = await axios.get(
        `/api/admin/stat/daily_sales?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const responseOrders = await axios.get(
        `/api/admin/stat/daily_order_count?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (
        responseSales.data.statusCode === 1 &&
        responseOrders.data.statusCode === 1
      ) {
        const salesData = responseSales.data.resultData.map(item => ({
          date: item.createdAt,
          daySales: parseFloat(item.dailySales),
        }));

        const ordersData = responseOrders.data.resultData.map(item => ({
          date: item.createdAt,
          dayOrders: parseInt(item.dailyOrderCount, 10),
        }));

        const combinedData = salesData.map(item => {
          const orderItem = ordersData.find(
            ordItem => ordItem.date === item.date,
          );
          return {
            ...item,
            dayOrders: orderItem ? orderItem.dayOrders : 0,
          };
        });

        setData(combinedData);
      } else {
        console.error("API Error: ", responseSales.data.resultMsg);
      }
    } catch (error) {
      console.error("Fetching data failed: ", error);
    }
  };

  const handleYearChange = event => {
    setYear(event.target.value);
  };

  const handleMonthChange = event => {
    setMonth(event.target.value);
  };

  const handleShowMonthly = () => {
    setShowMonthly(true);
    setShowSales(false);
    fetchMonthlyData(year);
  };

  const handleShowDaily = () => {
    setShowMonthly(false);
    setShowSales(false);
    fetchDailyData(year, month);
  };

  const handleShowMonthlySales = () => {
    setShowMonthly(true);
    setShowSales(true);
    fetchMonthlySalesData(year);
  };

  const handleShowDailySales = () => {
    setShowMonthly(false);
    setShowSales(true);
    fetchDailySalesData(year, month);
  };

  useEffect(() => {
    fetchMonthlyData(year);
  }, [year]);

  return (
    <div style={{ padding: "120px" }}>
      <h2>
        {showSales
          ? showMonthly
            ? "월별 매출 및 주문 통계"
            : "일별 매출 및 주문 통계"
          : showMonthly
            ? "월별 회원 가입 및 탈퇴 통계"
            : "일별 회원 가입 및 탈퇴 통계"}
      </h2>
      <select value={year} onChange={handleYearChange}>
        {[...Array(10).keys()].map(offset => {
          const displayYear = new Date().getFullYear() - offset;
          return (
            <option key={displayYear} value={displayYear}>
              {displayYear}
            </option>
          );
        })}
      </select>

      {!showMonthly && (
        <select value={month} onChange={handleMonthChange}>
          {[...Array(12).keys()].map(offset => {
            const displayMonth = offset + 1;
            return (
              <option key={displayMonth} value={displayMonth}>
                {displayMonth < 10 ? `0${displayMonth}` : displayMonth}
              </option>
            );
          })}
        </select>
      )}
      <div
        className="buttonforstatistics"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className="btn"
          onClick={handleShowMonthly}
          style={{ margin: "0px 10px" }}
        >
          월별 회원 통계 보기
        </button>
        <button
          className="btn"
          onClick={handleShowDaily}
          style={{ margin: "0px 10px" }}
        >
          일별 회원 통계 보기
        </button>
        <button
          className="btn"
          onClick={handleShowMonthlySales}
          style={{ margin: "0px 10px" }}
        >
          월별 매출 통계 보기
        </button>
        <button
          className="btn"
          onClick={handleShowDailySales}
          style={{ margin: "0px 10px" }}
        >
          일별 매출 통계 보기
        </button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={showMonthly ? "createdAt" : "date"} />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey={
              showSales
                ? showMonthly
                  ? "monthSales"
                  : "daySales"
                : showMonthly
                  ? "monthSignUpCount"
                  : "daySignUpCount"
            }
            stroke="#8884d8"
            name={
              showSales
                ? showMonthly
                  ? "월별 매출"
                  : "일별 매출"
                : showMonthly
                  ? "월별 가입 수"
                  : "일별 가입 수"
            }
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey={
              showSales
                ? showMonthly
                  ? "monthOrders"
                  : "dayOrders"
                : showMonthly
                  ? "monthSignOutCount"
                  : "daySignOutCount"
            }
            stroke="#82ca9d"
            name={
              showSales
                ? showMonthly
                  ? "월별 주문 수"
                  : "일별 주문 수"
                : showMonthly
                  ? "월별 탈퇴 수"
                  : "일별 탈퇴 수"
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsforAdmin;
