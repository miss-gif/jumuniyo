import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InfoManagement from "./storemanagement/InfoManagement";
import CategoryManagement from "./storemanagement/CategoryManagement";
import MenuManagement from "./storemanagement/MenuManagement";

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
    restaurantState: 2,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("storeInfo");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getCookie = name => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
          return null;
        };

        const accessToken = getCookie("accessToken");

        if (!accessToken) {
          navigate("/login");
          return;
        }

        console.log("Fetching store info with accessToken:", accessToken);

        const response = await axios.get("/api/owner/restaurant", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("Store info response:", response.data);

        setInfo(response.data.resultData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching store info:", error);
        setError("데이터를 가져오는 중 에러가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleStatusToggle = async () => {
    const newStatus = info.restaurantState === 1 ? 2 : 1;
    try {
      const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      const accessToken = getCookie("accessToken");

      await axios.get("/api/owner/restaurant/state", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          statusCode: newStatus,
        },
      });

      setInfo(prevInfo => ({
        ...prevInfo,
        restaurantState: newStatus,
      }));

      // 모달 메시지 설정 및 모달 표시
      setModalMessage(
        newStatus === 1 ? "영업시작되었습니다." : "영업종료되었습니다.",
      );
      setShowModal(true);
    } catch (error) {
      console.error("상태 변경 중 에러 발생: ", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.reload(); // 페이지 새로고침
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
      <div className="store-management-body">
        <div className="tabs">
          <button className="btn" onClick={() => setActiveTab("storeInfo")}>
            매장 설정
          </button>
          <button
            className="btn"
            onClick={() => setActiveTab("categoryManagement")}
          >
            카테고리 관리
          </button>
          <button
            className="btn"
            onClick={() => setActiveTab("menuManagement")}
          >
            메뉴 설정
          </button>
        </div>
        {console.log("Active tab:", activeTab)}
        {activeTab === "storeInfo" && (
          <div className="statusborder">
            <div className="statusandInfo">
              <div className="status-section">
                <h2 className="status-title">
                  영업 상태: {info.restaurantState === 1 ? "영업중" : "준비중"}
                </h2>
                <button className="status-toggle" onClick={handleStatusToggle}>
                  {info.restaurantState === 1 ? "영업종료" : "영업시작"}
                </button>
              </div>
              <InfoManagement
                info={info}
                setInfo={setInfo}
                setLoading={setLoading}
                setError={setError}
              />
            </div>
          </div>
        )}
        {activeTab === "categoryManagement" && <CategoryManagement />}
        {activeTab === "menuManagement" && <MenuManagement />}

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>{modalMessage}</p>
              <button onClick={closeModal}>확인</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreManagement;
