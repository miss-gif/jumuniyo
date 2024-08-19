import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import InfoManagement from "./storemanagement/InfoManagement";
import MenuManagement from "./storemanagement/MenuManagement";
import CouponManagement from "./storemanagement/CouponManagement"; // 새로운 컴포넌트 import
import queryString from "query-string"; // query-string 패키지 import
import LoadingSpinner from "../common/LoadingSpinner";

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
  const location = useLocation();

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
      localStorage.removeItem("activeTab");
    }
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

        //console.log("액세스토큰 :", accessToken);

        const response = await axios.get("/api/owner/restaurant", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // console.log("가게정보 데이터:", response.data);

        setInfo(response.data.resultData);
        setLoading(false);
      } catch (error) {
        //console.error("Error fetching store info:", error);
        setError("데이터를 가져오는 중 에러가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, location]);

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

      setModalMessage(
        newStatus === 1 ? "영업시작되었습니다." : "영업종료되었습니다.",
      );
      setShowModal(true);
    } catch (error) {
      //console.error("상태 변경 중 에러 발생: ", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  if (loading) {
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="store-management">
      <h2 className="store-management-tab">매장관리</h2>
      <div className="store-management-body">
        <div className="tabs">
          <button
            className={`btn ${activeTab === "storeInfo" ? "active" : ""}`}
            onClick={() => setActiveTab("storeInfo")}
          >
            매장 설정
          </button>

          <button
            className={`btn ${activeTab === "menuManagement" ? "active" : ""}`}
            onClick={() => setActiveTab("menuManagement")}
          >
            메뉴 설정
          </button>

          <button
            className={`btn ${activeTab === "couponManagement" ? "active" : ""}`}
            onClick={() => setActiveTab("couponManagement")}
          >
            쿠폰 설정
          </button>
        </div>
        {/* {console.log("Active tab:", activeTab)} */}
        {activeTab === "storeInfo" && (
          <div className="statusborder">
            <div className="statusandInfo">
              <div className="status-section">
                <h2 className="status-title">
                  영업 상태: {info.restaurantState === 1 ? "영업중" : "준비중"}
                </h2>
                <button
                  className="btn status-toggle"
                  onClick={handleStatusToggle}
                >
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
        {activeTab === "menuManagement" && <MenuManagement />}
        {activeTab === "couponManagement" && <CouponManagement />}

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{modalMessage}</h2>
              <br />
              <button className="btn" onClick={closeModal}>
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreManagement;
