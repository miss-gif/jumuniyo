import React from "react";

const Home = () => {
  return (
    <>
      <div className="home-tab"></div>
      <div className="orderList">
        {/* 반복 */}
        <div className="oneOrder">
          <div className="time"></div>
          <div className="orderInfo">
            <div className="orderAmount">
              <div className="orderNumber">[메뉴 4개]</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
