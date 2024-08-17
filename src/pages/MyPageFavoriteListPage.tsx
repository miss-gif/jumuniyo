import Favorite from "@mui/icons-material/Favorite";
import { Alert, ToggleButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import jwtAxios from "../api/user/jwtUtil";
import Mypage from "../components/join/Mypage";
import { useNavigate } from "react-router-dom";

interface Favorite {
  restaurantPk: number;
  restaurantName: string;
  reviewAvgScore: null;
  reviewTotalElements: number;
  restaurantAddr: string;
  restaurantState: number;
  isFollow: number;
  restaurantPic: string;
}

const MyPageFavoriteListPage: React.FC = () => {
  const [favorite, setFavorite] = useState<Favorite[]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<number, boolean>>(
    {},
  );

  const navigate = useNavigate();

  const getFavoriteList = async () => {
    try {
      const res = await jwtAxios.get("/api/restaurant/followed?page=1");
      const list = res.data.resultData.list;
      setFavorite(list);

      // Initialize selectedItems state
      const initialSelectedItems = list.reduce(
        (
          acc: { [x: string]: boolean },
          item: { restaurantPk: string | number; isFollow: number },
        ) => {
          acc[item.restaurantPk] = item.isFollow === 1; // Assuming 1 means followed
          return acc;
        },
        {} as Record<number, boolean>,
      );
      setSelectedItems(initialSelectedItems);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  const deleteFavorite = async (followPk: number) => {
    try {
      await jwtAxios.put(`/api/follow/toggle/${followPk}`);
      // Update the selectedItems state
      setSelectedItems(prev => ({
        ...prev,
        [followPk]: !prev[followPk],
      }));
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  useEffect(() => {
    getFavoriteList();
  }, []);

  if (favorite.length <= 0) {
    return (
      <div className="mypage-wrap">
        <Mypage />
        <div className="mypage-box">
          <Alert variant="outlined" severity="info">
            즐겨찾기한 가게가 없습니다.
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <h3>찜한 가게 리스트</h3>
        {favorite && favorite.length > 0 ? (
          <div className="order-list-gap">
            {favorite.map(fav => (
              <div key={fav.restaurantPk}>
                <div className="order-list">
                  <div className="flex-between-real-box">
                    <div className="order-main">
                      {!fav.restaurantPic ? (
                        <img
                          src={"/images/defaultRes.png"}
                          className="order-logo"
                          alt="Order Logo"
                        />
                      ) : (
                        <img
                          src={`${fav.restaurantPic}`}
                          className="order-logo"
                          alt="Order Logo"
                        />
                      )}
                      <div>
                        <h3>
                          {fav.restaurantState === 2 ? "준비중" : "운영중"}
                        </h3>
                        {fav.restaurantName}
                      </div>
                    </div>

                    <div className="flex-center">
                      <button
                        className="btn"
                        onClick={() => {
                          navigate(`/restaurants/${fav.restaurantPk}`);
                        }}
                      >
                        주문하러 가기
                      </button>
                      <ToggleButton
                        value="check"
                        selected={selectedItems[fav.restaurantPk] || false}
                        onChange={() => {
                          deleteFavorite(fav.restaurantPk);
                        }}
                      >
                        <Favorite />
                      </ToggleButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyPageFavoriteListPage;
