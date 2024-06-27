import styled from "@emotion/styled";
import React from "react";

const Menu = () => {
  // const [menuTitle, setMenuTitle] = useState("");
  // const [menuContent, setMenuContent] = useState("");
  // const [menuPrice, setMenuPrice] = useState(0);

  return (
    <Body>
      <Left className="left">
        <RestaurantInfo className="restaurant-info border-set">
          <RestaurantTitle className="restaurant-title">
            롯데리아-서성네거리점
          </RestaurantTitle>
          <RestaurantLogo className="restaurant-logo"></RestaurantLogo>
          <RestaurantContent className="restaurant-content">
            <RestaurantList className="restaurant-list">
              <ListStar className="list-star">별점</ListStar>
              <ListDiscount className="list-minimumOrder">
                12,000원 이상 주문 시 3,000원 할인
              </ListDiscount>
              최소주문금액
              <MinumumOrder className="list-minimumOrder">
                11,000원
              </MinumumOrder>
              결제<PayMethod className="list-payMethod">요기서결제</PayMethod>
              <Discount className="list-payMethod">3,000원 할인</Discount>
            </RestaurantList>
          </RestaurantContent>
        </RestaurantInfo>
        <div className="choice">
          <ThreeChoices className="threeChoices">
            <ul>
              <li>
                <div>메뉴</div>
              </li>
              <li>
                <div>클린리뷰</div>
              </li>
              <li>
                <div>정보</div>
              </li>
            </ul>
          </ThreeChoices>
          <div className="menu-slide">
            <div className="container">
              <OneMenu className="oneMenu border-set">
                <div className="menuPicture"></div>
                <div className="menuTitle">더블한우</div>
                <div className="menuPrice">14,200</div>
              </OneMenu>
            </div>
          </div>
          <MenuComponent>
            <MenuList className="menu-list">
              <MenuListOneMenu className="menu-list-oneMenu">
                <MenuListOneMenuTable className="menu-list-oneMenu-table">
                  <MenuListOneMenuTableData>
                    <div className="menu-list-name">더블 데리버거 세트</div>
                    <div className="menu-list-content">두 장의 페티</div>
                    <div className="menu-list-price">6,700원</div>
                  </MenuListOneMenuTableData>
                  <MenuListOneMenuTablePic>/ </MenuListOneMenuTablePic>
                </MenuListOneMenuTable>
              </MenuListOneMenu>
            </MenuList>
          </MenuComponent>
        </div>
      </Left>
      <Right className="right">
        <OrderTab className="order-tab">주문표</OrderTab>
        <OrderMenu className="order-menu">
          주문표에 담긴 메뉴가 없습니다.
        </OrderMenu>
        <OrderPrice className="order-price">배달요금 3,000원 별도</OrderPrice>
        <OrderButton className="order-button">주문하기</OrderButton>
      </Right>
    </Body>
  );
};

export default Menu;

const ListStar = styled.div`
  display: flex;
  width: 94.41px;
  height: 22.12px;
  padding-bottom: 0.7px;
  justify-content: center;
  align-items: flex-start;
  gap: 0.8px;
`;
const ListDiscount = styled.div`
  display: flex;
  width: 178.73px;
  height: 21.42px;
  flex-direction: column;
  justify-content: center;

  color: #fa0050;

  font-family: "Malgun Gothic";
  font-size: 12.403px;
  font-style: normal;
  font-weight: 400;
  line-height: 21.42px; /* 172.698% */
  letter-spacing: -1px;
`;
const MinumumOrder = styled.div`
  display: flex;
  width: 178.53px;
  height: 21.41px;
  padding-right: 55.24px;
  align-items: center;
`;
const PayMethod = styled.div`
  display: flex;
  width: 178.53px;
  height: 21.41px;
  padding-right: 90.69px;
  align-items: center;
`;
const Discount = styled.div`
  display: flex;
  height: 23.2px;
  padding: 0px 4.8px 5.88px 5px;
  justify-content: center;
  align-items: center;

  border: 1px solid #fa0050;
`;

const RestaurantLogo = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;

  border: 1px solid #d9d9d9;
`;

const RestaurantContent = styled.div`
  display: inline-flex;
  padding: 0px 0px 2.62px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: -0.21px;
`;

const MenuComponent = styled.div`
  display: flex;
  width: 658px;
  height: 525px;
  padding-top: 1px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const MenuList = styled.div`
  display: flex;
  width: 658px;
  height: 524px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
`;

const MenuListOneMenu = styled.div`
  display: flex;
  width: 658px;
  height: 104px;
  padding: 12px 10px 12px 15px;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid #d9d9d9;
`;

const MenuListOneMenuTable = styled.div`
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: flex-start;
`;

const MenuListOneMenuTableData = styled.div`
  display: flex;
  width: 521px;
  padding: 9.94px 10px 5.23px 0px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 0.28px;
`;

const MenuListOneMenuTablePic = styled.div`
  width: 112px;
  height: 80px;
`;

const Body = styled.div`
  display: flex;
  height: 1520.53px;
  padding-right: 10px;
  align-items: flex-start;
`;

const Left = styled.div`
  width: 680px;
  height: 1520.53px;
`;

const RestaurantInfo = styled.div`
  width: 660px;
  height: 174.25px;
  flex-shrink: 0;

  border: 1px solid #d9d9d9;
  background: #fff;
`;

const RestaurantTitle = styled.div`
  display: flex;
  width: 658px;
  padding: 9.5px 487.47px 11.5px 10px;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
`;

const RestaurantList = styled.div`
  display: inline-flex;
  padding: 0px 0px 2.62px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: -0.21px;
`;

const ThreeChoices = styled.div`
  display: flex;
  width: 660px;
  height: 49px;
  padding: 1px 1.01px 1px 0px;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;

  border-top: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
`;

const OneMenu = styled.div`
  width: 140px;
  height: 166px;
`;

const Right = styled.div`
  display: flex;
  width: 330px;
  height: 261px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const OrderTab = styled.div`
  display: flex;
  width: 330px;
  height: 42px;
  padding: 9.5px 268.6px 10.5px 15px;
  align-items: center;
  flex-shrink: 0;
  background: #333;
  color: #fff;
`;
const OrderMenu = styled.div`
  display: flex;
  width: 330px;
  height: 122px;
  padding: 0px 64.89px 0px 65.08px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid #d9d9d9;

  background: #fff;
`;
const OrderPrice = styled.div`
  display: flex;
  width: 330px;
  height: 42px;
  padding: 11px 15.8px 11px 172.25px;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;

  border: 1px solid #ddd;

  background: #fff;
`;
const OrderButton = styled.div`
  display: flex;
  height: 55px;
  padding: 11px 0px 20px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border: 1px solid #ccc;

  opacity: 0.65;
  background: #ccc;
`;
