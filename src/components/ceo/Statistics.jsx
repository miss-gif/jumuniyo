import React, { useState } from "react";
import MyBarChart from "../ceo/dashboard/Charts/BarChart";
import MyLineChart from "../ceo/dashboard/Charts/LineChart";
import "../../css/components/ceo/_statistics.scss";

const Statistics = () => {
  const [showCharts, setShowCharts] = useState(false);

  const handleCharts = () => {
    setShowCharts(!showCharts);
  };

  return (
    <div>
      <div>매장통계</div>
      <ul>
        <li>주문</li>
        <li>리뷰</li>
        <li>별점</li>
        <li>북마크</li>
        <li>매출</li>
      </ul>

      <button className="saleChart" onClick={handleCharts}>
        판매량 보기
      </button>
      {showCharts && (
        <>
          <div className="tabforsales">
            <ul className="tabforsalesUl">
              <li>
                <button className="btnforYearChart">연별매출</button>
              </li>
              <li>
                <button className="btnforMonthChart">월별매출</button>
              </li>
              <li>
                <button className="btnforDayChart">일별매출</button>
              </li>
            </ul>
          </div>
          <div className="monthCharts">
            <MyLineChart />
            <MyBarChart />
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
