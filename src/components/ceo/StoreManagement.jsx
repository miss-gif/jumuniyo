import React, { useEffect, useState } from "react";
import InfoData from "../restaurantdetail/info.json";

const StoreManagement = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    setInfo(InfoData);
  }, []);

  return (
    <>
      <div>
        <p>
          <div>현재 상태</div>
          <select>
            <option value="영업중">
              <p>영업중</p>
            </option>
            <option value="준비중">
              <p>준비중</p>
            </option>
          </select>
        </p>
      </div>
      <div>
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
        </div>
      </div>
    </>
  );
};

export default StoreManagement;
