import React from "react";

const RestaurantDetailPage = () => {
  return (
    <div className="restaurant-detail-page">
      <div className="restaurant-detail-page__left">
        <div className="restaurant-detail-page__info">
          <h2 className="restaurant-detail-page__info-name">
            호식이두마리치킨-대명1호점
          </h2>
          <div className="restaurant-detail-page__info-content">
            <div className="restaurant-detail-page__info-image">
              <img src="https://picsum.photos/100/" alt="" />
            </div>
            <div className="restaurant-detail-page__info-details">
              <div className="restaurant-detail-page__info-rating">
                ★★★★★ 4.9
              </div>
              <p className="restaurant-detail-page__info-payment">
                <span className="gray">결제</span> 신용카드 , 현금 , 요기서결제
              </p>
            </div>
          </div>
          <p className="restaurant-detail-page__info-notice">
            <span className="bold">사장님알림</span> 💜💙💛❤언제나 즐거운 리뷰
            이벤트💜💙💛❤ 🖤호식이두마리치킨대명1호점
          </p>
        </div>

        <div className="restaurant-detail-page__menu">
          <div className="restaurant-detail-page__menu-header">
            <h3 className="header__item header__menu">메뉴</h3>
            <h3 className="header__item header__review">클린리뷰</h3>
            <h3 className="header__item header__info">정보</h3>
          </div>
          <div className="restaurant-detail-page__menu-content">
            <div className="carousel">캐러셀 자리</div>
            <div className="menu-category">
              <h4 className="menu-category__title">인기메뉴</h4>
              <ul className="menu-category__list">
                <li className="menu-category__item">
                  <div className="menu-category__text">
                    <div className="menu-category__name">
                      한마리 ＋ 순살치킨
                    </div>
                    <div className="menu-category__description">
                      국내산 하림닭 ／ 가심비 두 배 세트!
                    </div>
                    <div className="menu-category__price">23,000원</div>
                  </div>
                  <div className="menu-category__image">
                    <img src="https://picsum.photos/100/" alt="" />
                  </div>
                </li>
                <li className="menu-category__item">
                  <div className="menu-category__text">
                    <div className="menu-category__name">
                      한마리 ＋ 순살치킨
                    </div>
                    <div className="menu-category__description">
                      국내산 하림닭 ／ 가심비 두 배 세트!
                    </div>
                    <div className="menu-category__price">23,000원</div>
                  </div>
                  <div className="menu-category__image">
                    <img src="https://picsum.photos/100/" alt="" />
                  </div>
                </li>
                <li className="menu-category__item">
                  <div className="menu-category__text">
                    <div className="menu-category__name">
                      한마리 ＋ 순살치킨
                    </div>
                    <div className="menu-category__description">
                      국내산 하림닭 ／ 가심비 두 배 세트!
                    </div>
                    <div className="menu-category__price">23,000원</div>
                  </div>
                  <div className="menu-category__image">
                    <img src="https://picsum.photos/100/" alt="" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="restaurant-detail-page__right">
        <div className="order-summary">
          <div className="order-summary-content">
            <div className="order-summary__header">주문표</div>
            <div className="order-summary__content-wrapper">
              <div className="order-summary__content">
                한마리 ＋ 순살치킨: New）수라깐풍, 크리스피 골드(국내산 순살),
                콜라 500ml 기본
              </div>
              <div className="order-summary__price-quantity">
                <div className="order-summary__wrap">
                  <div className="order-summary__delete-button">x</div>
                  <div className="order-summary__price">27,500원</div>
                </div>
                <div className="quantity-count">
                  <div className="quantity-count__decrease-button">-</div>
                  <div className="quantity-count__current-quantity">1</div>
                  <div className="quantity-count__increase-button">+</div>
                </div>
              </div>
              <div className="order-summary__total-price">27,000원</div>
            </div>
          </div>
          <div className="order-summary__submit-button">주문하기</div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
