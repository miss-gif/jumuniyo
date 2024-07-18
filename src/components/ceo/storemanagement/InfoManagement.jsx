/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";

const InfoManagement = ({ info, setInfo, setLoading, setError }) => {
  const [editMode, setEditMode] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      const accessToken = getCookie("accessToken");

      await axios.put("/api/owner/restaurant", info, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert("정보가 저장되었습니다.");
      setEditMode(false);
    } catch (error) {
      console.error("정보 저장 중 에러 발생: ", error);
      alert("정보 저장 중 에러가 발생했습니다.");
    }
  };

  return (
    <div className="info-section">
      <h3>업체정보</h3>
      <p>
        <h4>영업시간</h4>
        {editMode ? (
          <>
            <input
              type="time"
              name="openTime"
              value={info.openTime}
              onChange={handleChange}
              placeholder="오픈 시간"
            />
            -
            <input
              type="time"
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
        <h4>가게 소개</h4>
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
        <h4>사장님 알림</h4>
        {editMode ? (
          <textarea
            name="reviewDescription"
            value={info.reviewDescription}
            onChange={handleChange}
            placeholder="사장님 알림"
          />
        ) : (
          info.reviewDescription
        )}
      </p>
      <div className="button-wrap">
        {editMode ? (
          <button className="btn" onClick={handleSave}>
            저장
          </button>
        ) : (
          <button className="btn" onClick={() => setEditMode(true)}>
            수정하기
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoManagement;
