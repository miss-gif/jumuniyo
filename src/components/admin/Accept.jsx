import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Accept = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = Cookies.get("accessToken"); // 쿠키에서 accessToken을 가져옴
        const response = await axios.get(
          "/api/admin/accept/unAccept_restaurant_list",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰을 포함시킴
            },
          },
        );

        if (response.data.statusCode === 1) {
          setRestaurants(response.data.resultData);
        } else {
          setError("데이터를 불러오는 중 오류가 발생했습니다.");
        }
      } catch (error) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleCardClick = resPk => {
    navigate(`/admin/accept/details/${resPk}`);
  };

  const handleAccept = async resPk => {
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
      setRestaurants(
        restaurants.filter(restaurant => restaurant.resPk !== resPk),
      ); // 승인된 음식점은 리스트에서 제거
    } catch (error) {
      alert("음식점 승낙 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="ask-wrap">
      <h1 style={{ fontSize: "20px", marginBottom: "20px" }}>
        승인되지 않은 음식점 목록
      </h1>

      <div className="tap">
        <div className="tap-number">등록 번호</div>
        <div className="tap-title">음식점 이름</div>
        <div className="tap-status">주소</div>
        <div className="tap-writeTime">등록 일자</div>
      </div>
      <div className="restaurantList">
        {restaurants.length === 0 ? (
          <p>승인되지 않은 음식점이 없습니다.</p>
        ) : (
          restaurants.map(restaurant => (
            <div
              key={restaurant.resPk}
              className="oneRestaurant"
              onClick={() => handleCardClick(restaurant.resPk)}
            >
              <div className="tap-number">{restaurant.resRegiNum}</div>
              <div className="tap-title">{restaurant.resName}</div>
              <div className="tap-status">{restaurant.resAddr}</div>
              <div className="tap-writeTime">
                {new Date(restaurant.createdAt).toLocaleString()}
              </div>
              <button onClick={() => handleAccept(restaurant.resPk)}>
                승낙하기
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Accept;
