import React from "react";

const Home = () => {
  return (
    <div className="ceo-home">
      <div className="home-tab">홈</div>
      <div className="order-body">
        <div className="confirmedList">
          <div className="confirmedList-tab">접수된 주문</div>
          {/* 반복 */}
          <div className="oneOrder">
            <div className="orderedTime">13:22</div>
            <div className="orderInfo">
              <div className="orderAmount">
                <div className="orderNumber">[메뉴 4개]</div>
                <div className="orderPrice">31,800</div>
                <div className="payMethod">후불</div>
              </div>
              <div className="orderedMenu">
                {/* 반복 */}
                <div className="menu-name">김치찌개</div>
                <div className="menu-amount">1개</div>
              </div>
              <div className="orderedAddress">
                서울 송파구 방이동 44-2 장은빌딩 9층
              </div>
              <div className="requested">단무지 많이 주고 일회용품 ㄴㄴ</div>
            </div>
            <div className="orderStatus">
              <div className="orderLeftTime">12분</div>
              <div className="orderProcess">배달중</div>
            </div>
          </div>
          <div className="oneOrder">
            <div className="orderedTime">13:22</div>
            <div className="orderInfo">
              <div className="orderAmount">
                <div className="orderNumber">[메뉴 4개]</div>
                <div className="orderPrice">31,800</div>
                <div className="payMethod">후불</div>
              </div>
              <div className="orderedMenu">
                {/* 반복 */}
                <div className="menu-name">김치찌개</div>
                <div className="menu-amount">1개</div>
              </div>
              <div className="orderedAddress">
                서울 송파구 방이동 44-2 장은빌딩 9층
              </div>
              <div className="requested">단무지 많이 주고 일회용품 ㄴㄴ</div>
            </div>
            <div className="orderStatus">
              <div className="orderLeftTime">12분</div>
              <div className="orderProcess">배달중</div>
            </div>
          </div>
        </div>
        <div className="orderedList">
          {/* 반복 */}
          <div className="oneOrder">
            <div className="AnOrderHead">새 주문</div>
            <div className="AnOrderBody">
              <div className="AnOrderLeft">
                <div className="requested">
                  <h3>요청사항</h3>
                  <div className="requestedabout">
                    <div className="requestedto">
                      <h4>가게 </h4>
                      <h4>배달 </h4>
                    </div>
                    <div className="requestedof">
                      <p>맛있게해주세요</p>
                      <p>빨리와주세요</p>
                    </div>
                  </div>
                </div>
                <div className="orderedMenu">
                  <h3>주문내역</h3>
                  <div className="orderedMenuInf">
                    <div className="menuName">양념치킨</div>
                    <div className="menuAmount">1</div>
                    <div className="menuPrice">3,000</div>
                  </div>
                  <div className="orderedMenuInf">
                    <div className="menuName">양념치킨</div>
                    <div className="menuAmount">1</div>
                    <div className="menuPrice">3,000</div>
                  </div>
                  <div className="orderedMenuInf">
                    <div className="menuName">양념치킨</div>
                    <div className="menuAmount">1</div>
                    <div className="menuPrice">3,000</div>
                  </div>
                  <div className="allOrderedMenuInf">
                    <div className="title">총주문</div>
                    <div className="allMenuAmount">1</div>
                    <div className="allMenuPrice">3,000</div>
                  </div>
                </div>
              </div>
              <div className="AnOrderRight">
                <div className="AnOrderInf">
                  <div className="orderAddress">
                    <h3> 배달주소</h3>
                    <p>경기도 화성시 이성로 대명아파트 102동 906호</p>
                  </div>
                  <div className="orderCallNumber">
                    <h3>고객연락처</h3>
                    <p>010-1111-2222</p>
                  </div>
                  <div className="orderCallNumber">
                    <h3>주문번호</h3>
                    <p>PK012345143516</p>
                  </div>
                  <div className="orderCallNumber">
                    <h3> 주문시간</h3>
                    <p>13:54</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="acceptOrRefuse">
              <button className="btn">수락하기</button>
              <button className="btn">취소하기</button>
            </div>
          </div>
        </div>
      </div>

      <div className="todaySale"></div>
    </div>
  );
};

export default Home;
