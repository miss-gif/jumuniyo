import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const API_URL = "/api/menu?menu_res_pk=10";

const CeoPage = () => {
  const [cookies] = useCookies(["accessToken"]);
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const token = cookies.accessToken;
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("토큰: ", token);
        if (!response.ok) {
          throw new Error("네트워크 응답에 문제가 있습니다.");
        }
        const data = await response.json();
        setMenuList(data.resultData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuList();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>에러 발생: {error}</p>;
  }

  return (
    <div>
      <p>결과출력</p>
      {menuList.length > 0 ? (
        <ul>
          {menuList.map(menu => (
            <li key={menu.menu_pk}>
              <p>메뉴 이름: {menu.menu_name}</p>
              <p>메뉴 설명: {menu.menu_content}</p>
              <p>메뉴 가격: {menu.menu_price}원</p>
              <p>등록일: {menu.created_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>메뉴가 없습니다.</p>
      )}
    </div>
  );
};

export default CeoPage;
