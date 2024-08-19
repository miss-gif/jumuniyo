import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

const AcceptDetail = () => {
  const { resPk } = useParams(); // URL에서 resPk를 추출
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await axios.get(
          `/api/admin/accept/unAccept_restaurant_list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.statusCode === 1) {
          setRestaurant(response.data.resultData);
        } else {
          setError("데이터를 불러오는 중 오류가 발생했습니다.");
        }
      } catch (error) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetail();
  }, [resPk]);

  const handleAccept = async () => {
    try {
      const token = Cookies.get("accessToken");
      await axios.patch(
        `/api/admin/accept/${resPk}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("음식점이 승인되었습니다.");
      navigate("/"); // 승낙 후 메인 페이지로 이동
    } catch (error) {
      alert("음식점 승낙 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!restaurant) return <div>음식점 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <div className="restaurant-detail-container">
        <h2>{restaurant.resName}</h2>
        <p>
          <strong>등록 번호:</strong> {restaurant.resRegiNum}
        </p>
        <p>
          <strong>주소:</strong> {restaurant.resAddr}
        </p>
        <p>
          <strong>설명1:</strong> {restaurant.resDescription1}
        </p>
        <p>
          <strong>설명2:</strong> {restaurant.resDescription2}
        </p>
        <p>
          <strong>등록 일자:</strong>
          {new Date(restaurant.createdAt).toLocaleString()}
        </p>
        <button onClick={handleAccept} className="accept-button">
          승낙하기
        </button>
      </div>
      {/* <div className="acceptDetail-wrap">
        <h1 className="adminH1">No. 12432</h1>
        <div className="apiandSignInf">
          <div className="apiInf">
            <h1>API 정보</h1>
            <div className="ceo-name">사업자 성함: 김기덕</div>
            <div className="res-name">사업장 이름: 피자와 치킨</div>
            <div className="res-address">
              사업장 주소: 대구광역시 중구 대구로 12길 22
            </div>
            <div className="res-open-date">등록 날짜: 2024-07-07</div>
            <div className="res-status">영업상태: 영업 중</div>
            <div className="certificate-pic">
              <img src="/images/defaultRes.png" alt="사업자 이미지" />
            </div>
          </div>
          <div className="signupInf">
            <h1>회원가입 정보</h1>
            <div className="ceo-name">사업자 성함: 김기덕</div>
            <div className="res-name">사업장 이름: 피자와 치킨</div>
            <div className="res-address">
              사업장 주소: 대구광역시 중구 대구로 12길 22
            </div>
            <div className="res-open-date">가입 날짜: 2024-06-07</div>
          </div>
        </div>
        <div className="buttonforaccept">
          <button className="btn">사업자 승낙</button>
          <button className="btn">사업자 거부</button>
        </div>
      </div> */}
    </>
  );
};

export default AcceptDetail;
