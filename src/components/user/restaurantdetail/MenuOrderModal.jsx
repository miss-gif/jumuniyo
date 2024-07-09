import React from "react";

const MenuOrderModal = () => {
  return (
    <div>
      <div className="탑">
        <div className="">메뉴상세</div>
        <div className="">x</div>
      </div>
      <div className="콘텐츠">
        <div className="내용">
          <img src="" alt="" />
          <div className="타이틀">[세트]직화무뼈불닭발+한마리(치킨선택)</div>
          <div className="설명">
            닭발과 치킨의 완벽한 조합
            직화무뼈불닭발+한마리(치킨선택)+치킨무+콜라
          </div>
        </div>
        <div className="가격">
          <div className="">가격</div>
          <div className="">24,900원</div>
        </div>
        <div className="필수옵션">
          <div className="">치킨 선택5 (필수 선택)</div>
          <div className="">
            <input type="radio" /> 뼈닭치킨
            <p>추가비용없음</p>
          </div>
          <div className="">
            <input type="radio" /> 순살치킨
            <p>+500원</p>
          </div>
        </div>
        <div className="추가옵션">
          <div className="">한마리 맛 선택 (필수 선택)</div>
          <div className="">
            <input type="checkbox" /> 순살치킨
            <p>+500원</p>
          </div>
          <div className="">
            <input type="checkbox" name="scales" checked />
            <label htmlFor="scales"> 순살치킨</label>
            <p>+500원</p>
          </div>
        </div>
        <div className="수량">
          <div className="">수량</div>
          <div className="">
            <div className="">-</div>
            <div className="">1</div>
            <div className="">+</div>
          </div>
        </div>
        <div className="총금액">
          <div className="">총 주문금액</div>
          <div className="">26,400원</div>
        </div>
      </div>
      <div className="바텀">
        <div className="">주문표에 추가</div>
        <div className="주문하기">주문하기</div>
      </div>
    </div>
  );
};

export default MenuOrderModal;
