import React, { useState } from "react";
import MyBarSaleChart from "./dashboard/Charts/BarSaleChart";

const Statistics = () => {
  const [showSaleCharts, setShowSaleCharts] = useState(false);

  const handleCharts = () => {
    setShowSaleCharts(!showSaleCharts);
  };

  return (
    <div className="statistics">
      <h1 className="statistics-title">매장통계</h1>
      <div className="tabforchoice">
        <ul className="tabforchoiceUl">
          <li>
            <button className="btn saleChart" onClick={handleCharts}>
              판매량 보기
            </button>
          </li>
          <li>
            <button className="btn btnforOrder">주문수</button>
          </li>
          <li>
            <button className="btn btnforReview">리뷰</button>
          </li>
          <li>
            <button className="btn btnforBookmark">북마크</button>
          </li>
        </ul>
      </div>

      {showSaleCharts && (
        <>
          <div className="monthCharts">
            {/* <MyLineSaleChart /> */}
            <MyBarSaleChart />
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
