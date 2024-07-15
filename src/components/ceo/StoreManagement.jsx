import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoreManagement = () => {
  const [info, setInfo] = useState({
    openTime: "",
    closeTime: "",
    addr: "",
    coorX: 0.1,
    coorY: 0.1,
    restaurantName: "",
    regiNum: "",
    restaurantDescription: "",
    reviewDescription: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 쿠키에서 accessToken 가져오기
        const getCookie = name => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
          return null;
        };

        const accessToken = getCookie("accessToken");

        console.log(accessToken);

        // accessToken이 없는 경우 로그인 페이지로 리디렉션
        if (!accessToken) {
          navigate("/ceopage/login");
          return;
        }

        // 서버에서 영업 상태 가져오기
        const statusResponse = await axios.get("/api/restaurant/manage/state", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const currentStatus = statusResponse.data.statusCode;
        setStatus(currentStatus);

        // 서버에서 매장 정보 데이터 요청
        const response = await axios.get("/api/owner/restaurant", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // 데이터 설정
        setInfo(response.data.resultData);
        setLoading(false);
      } catch (error) {
        setError("데이터를 가져오는 중 에러가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleStatusToggle = async e => {
    const newStatus = status === 1 ? 2 : 1;
    setStatus(newStatus);
    try {
      // 쿠키에서 accessToken 가져오기
      const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      const accessToken = getCookie("accessToken");

      // 서버로 상태 변경 요청
      await axios.get("/api/owner/restaurant/state", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          statusCode: newStatus,
        },
      });
    } catch (error) {
      console.error("상태 변경 중 에러 발생: ", error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // 쿠키에서 accessToken 가져오기
      const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      const accessToken = getCookie("accessToken");

      // 서버로 데이터 저장 요청
      await axios.put("/api/owner/restaurant", info, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert("정보가 저장되었습니다.");
      setEditMode(false); // 수정 모드 종료
    } catch (error) {
      console.error("정보 저장 중 에러 발생: ", error);
      alert("정보 저장 중 에러가 발생했습니다.");
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="store-management">
      <h2 className="store-management-tab">매장관리</h2>
      <div className="statusborder">
        <div className="status-taps">매장 설정</div>

        <div className="statusandInfo">
          <div className="status-section">
            <h2 className="status-title">영업 상태</h2>
            <button className="status-toggle" onClick={handleStatusToggle}>
              {status === 1 ? "영업중" : "준비중"}
            </button>
          </div>
          <div className="info-section">
            <h3>업체정보</h3>
            <p>
              <h4>영업시간</h4>
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="openTime"
                    value={info.openTime}
                    onChange={handleChange}
                    placeholder="오픈 시간"
                  />
                  -
                  <input
                    type="text"
                    name="closeTime"
                    value={info.closeTime}
                    onChange={handleChange}
                    placeholder="종료 시간"
                  />
                </>
              ) : (
                `${info.openTime} - ${info.closeTime}`
              )}
            </p>
            <p>
              <h4>주소</h4>
              {editMode ? (
                <input
                  type="text"
                  name="addr"
                  value={info.addr}
                  onChange={handleChange}
                  placeholder="주소"
                />
              ) : (
                info.addr
              )}
            </p>
            <h3>사업자정보</h3>
            <p>
              <h4>상호명</h4>
              {editMode ? (
                <input
                  type="text"
                  name="restaurantName"
                  value={info.restaurantName}
                  onChange={handleChange}
                  placeholder="상호명"
                />
              ) : (
                info.restaurantName
              )}
            </p>
            <p>
              <h4>사업자등록번호</h4>
              {editMode ? (
                <input
                  type="text"
                  name="regiNum"
                  value={info.regiNum}
                  onChange={handleChange}
                  placeholder="사업자등록번호"
                />
              ) : (
                info.regiNum
              )}
            </p>
            <p>
              <h4>사업장 설명</h4>
              {editMode ? (
                <textarea
                  name="restaurantDescription"
                  value={info.restaurantDescription}
                  onChange={handleChange}
                  placeholder="사업장 설명"
                />
              ) : (
                info.restaurantDescription
              )}
            </p>
            <p>
              <h4>리뷰 설명</h4>
              {editMode ? (
                <textarea
                  name="reviewDescription"
                  value={info.reviewDescription}
                  onChange={handleChange}
                  placeholder="리뷰 설명"
                />
              ) : (
                info.reviewDescription
              )}
            </p>
            {editMode ? (
              <button onClick={handleSave}>저장</button>
            ) : (
              <button onClick={() => setEditMode(true)}>수정하기</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManagement;
