/* eslint-disable react/prop-types */
import React from "react";

const InfoContent = ({ info }) => {
  return (
    <div>
      <div className="info-section">
        <h2>업체정보</h2>
        <p>
          <strong>영업시간</strong> {info.companyInfo?.businessHours}
        </p>
        <p>
          <strong>주소</strong> {info.companyInfo?.address}
        </p>
        <h2>사업자정보</h2>
        <p>
          <strong>상호명</strong> {info.businessInfo?.businessName}
        </p>
        <p>
          <strong>사업자등록번호</strong>{" "}
          {info.businessInfo?.businessRegistrationNumber}
        </p>
      </div>
    </div>
  );
};

export default InfoContent;
