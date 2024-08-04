/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import CategoryManagement from "./CategoryManagement";
import ModalForOk from "../ModalForOk";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";

const InfoManagement = ({ info, setInfo, setLoading, setError }) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editImageMode, setEditImageMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [detailAddress, setDetailAddress] = useState(info.detailAddress || "");

  const handleChange = e => {
    const { name, value } = e.target;
    setInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
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

      await axios.put(
        "/api/owner/restaurant",
        { ...info, addr: `${info.addr} ${detailAddress}` },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setModalMessage("정보가 저장되었습니다.");
      setEditMode(false);
    } catch (error) {
      setModalMessage("정보 저장 중 에러가 발생했습니다.");
    }
  };

  const handleImageSave = async () => {
    try {
      const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      const accessToken = getCookie("accessToken");

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await axios.post("/api/owner/restaurant/pic", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setModalMessage("이미지가 저장되었습니다.");
        setEditImageMode(false);
        setPreviewImage(null);
        window.location.reload(); // 페이지 새로고침
      }
    } catch (error) {
      setModalMessage("이미지 저장 중 에러가 발생했습니다.");
    }
  };

  const handleCancelImageEdit = () => {
    setEditImageMode(false);
    setPreviewImage(null);
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  const handleComplete = data => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setInfo(prevInfo => ({
      ...prevInfo,
      addr: fullAddress,
    }));
    setIsPostOpen(false);
  };

  return (
    <div className="info-section">
      <h3>로고</h3>
      <img
        src={
          previewImage
            ? previewImage
            : info.restaurantPic
              ? `/pic${info.restaurantPic}`
              : "/images/defaultRes.png"
        }
        alt="사진에러"
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          marginBottom: "30px",
        }}
      />
      {editImageMode ? (
        <>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="fileInput" className="btn btnforimg">
            이미지 선택
          </label>
          <button className="btn" onClick={handleImageSave}>
            이미지 저장
          </button>
          <button className="btn--cancel" onClick={handleCancelImageEdit}>
            취소
          </button>
        </>
      ) : (
        <button className="btn" onClick={() => setEditImageMode(true)}>
          로고 수정
        </button>
      )}
      <br />
      <br />
      <h3>업체정보</h3>
      <p>
        <h4>영업시간</h4>
        {editMode ? (
          <div className="time">
            <br />
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
          </div>
        ) : (
          `${info.openTime} - ${info.closeTime}`
        )}
      </p>
      <p>
        <h4>주소</h4>
        {editMode ? (
          <>
            <input
              type="text"
              name="addr"
              value={info.addr}
              onChange={handleChange}
              placeholder="주소"
              readOnly
            />
            <button className="btn" onClick={() => setIsPostOpen(true)}>
              주소 검색
            </button>
            <Modal
              isOpen={isPostOpen}
              onRequestClose={() => setIsPostOpen(false)}
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  width: "500px",
                  height: "600px",
                },
              }}
            >
              <DaumPostcode onComplete={handleComplete} autoClose={true} />
              <button onClick={() => setIsPostOpen(false)}>닫기</button>
            </Modal>
            <input
              type="text"
              name="detailAddress"
              value={detailAddress}
              onChange={e => setDetailAddress(e.target.value)}
              placeholder="상세주소"
            />
          </>
        ) : (
          `${info.addr} ${detailAddress}`
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
      <br />
      <h3>음식점 카테고리</h3>
      <CategoryManagement />
      {modalMessage && (
        <ModalForOk message={modalMessage} onClose={closeModal} />
      )}
    </div>
  );
};

export default InfoManagement;
