import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
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
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1월이 0이므로 +1
  const [data, setData] = useState([]);
  const [showMonthly, setShowMonthly] = useState(true); // 월별 통계를 기본으로 표시

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

        // 가입 수와 탈퇴 수 데이터를 합치기
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
      const formattedMonth = month < 10 ? `0${month}` : month; // 두 자릿수로 만들기
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
          daySignUpCount: parseInt(item.dailySignUpCount, 10), // 여기에서 숫자형으로 변환
        }));

        const signOutData = responseSignOut.data.resultData.map(item => ({
          date: item.createdAt,
          daySignOutCount: parseInt(item.dailySignOutCount, 10), // 이 부분도 변환 필요
        }));

        // 가입 수와 탈퇴 수 데이터를 합치기
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

  const handleYearChange = event => {
    setYear(event.target.value);
  };

  const handleMonthChange = event => {
    setMonth(event.target.value);
  };

  const handleShowMonthly = () => {
    setShowMonthly(true);
    fetchMonthlyData(year); // 월별 데이터를 가져옴
  };

  const handleShowDaily = () => {
    setShowMonthly(false);
    fetchDailyData(year, month); // 일별 데이터를 가져옴
  };

  useEffect(() => {
    // 기본적으로 월별 데이터를 표시
    fetchMonthlyData(year);
  }, [year]);

  return (
    <div>
      <h2>{showMonthly ? "월별" : "일별"} 회원 가입 및 탈퇴 통계</h2>
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

      <button onClick={handleShowMonthly}>월별 통계 보기</button>
      <button onClick={handleShowDaily}>일별 통계 보기</button>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={showMonthly ? "createdAt" : "date"} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey={showMonthly ? "monthSignUpCount" : "daySignUpCount"}
            fill="#8884d8"
            name={showMonthly ? "월별 가입 수" : "일별 가입 수"}
          />
          <Bar
            dataKey={showMonthly ? "monthSignOutCount" : "daySignOutCount"}
            fill="#82ca9d"
            name={showMonthly ? "월별 탈퇴 수" : "일별 탈퇴 수"}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsforAdmin;
