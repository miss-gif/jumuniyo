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
      <div className="tabforchoice">
        <ul className="tabforchoiceUl">
          <li>
            <button className="btn btnforOrder">주문</button>
          </li>
          <li>
            <button className="btn btnforReview">리뷰</button>
          </li>
          <li>
            <button className="btn btnforBookmark">북마크</button>
          </li>
          <li>
            <button className="btn saleChart" onClick={handleCharts}>
              판매량 보기
            </button>
          </li>
        </ul>
      </div>

      {showCharts && (
        <>
          <div className="tabforsales">
            <ul className="tabforsalesUl">
              <li>
                <button className="btn btnforYearChart">연별매출</button>
              </li>
              <li>
                <button className="btn btnforMonthChart">월별매출</button>
              </li>
              <li>
                <button className="btn btnforDayChart">일별매출</button>
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
