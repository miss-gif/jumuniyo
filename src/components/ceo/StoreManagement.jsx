import React, { useEffect, useState } from "react";
import InfoData from "../restaurantdetail/info.json";

const StoreManagement = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    setInfo(InfoData);
  }, []);

  return (
    <div className="store-management">
      <h1 className="store-management-tab">매장관리</h1>
      <div className="statusborder">
        <div className="statusandInfo">
          <div className="status-section">
            <h2 className="status-title">영업 상태</h2>
            <select className="status-choice">
              <option value="영업중">영업중</option>
              <option value="준비중">준비중</option>
            </select>
          </div>
          <div className="info-section">
            <h3>업체정보</h3>
            <p>
              <h4>영업시간</h4> {info.companyInfo?.businessHours}
            </p>
            <p>
              <h4>주소</h4> {info.companyInfo?.address}
            </p>
            <h3>사업자정보</h3>
            <p>
              <h4>상호명</h4> {info.businessInfo?.businessName}
            </p>
            <p>
              <h4>사업자등록번호</h4>{" "}
              {info.businessInfo?.businessRegistrationNumber}
            </p>
            <p>
              <h4>사업자 아이디</h4> imabusiness***
            </p>
            <p>
              <h4>사업자연락처</h4> 02-1342-2301
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManagement;
