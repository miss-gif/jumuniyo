import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Accept = () => {
  const [acceptItems, setAcceptItems] = useState([]);
  const navigate = useNavigate();

  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  const fetchData = async url => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      console.error("토큰을 찾을 수 없습니다.");
      return;
    }
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.statusCode === 1) {
        const formattedData = response.data.resultData.map(item => ({
          pk: item.inquiryPk,
          title: item.inquiryTitle,
          status: item.inquiryState === 2 ? "답변완료" : "미완료",
          completeTime: new Date(item.createdAt).toLocaleTimeString(),
        }));
        setAcceptItems(formattedData);
      } else {
        console.error("데이터 불러오기 실패:", response.data.resultMsg);
      }
    } catch (error) {
      console.error("데이터 불러오기 중 오류 발생:", error);
    }
  };
  const askItems = [
    {
      pk: 1,
      title: "이 쿠폰 어떻게 쓰는지 아는사람 있나요 없나요 있으면 손들어주삼??",
      status: "답변완료",
      completeTime: "23:00",
      writer: "올빼미",
      writeTime: "2024-01-01",
    },
    {
      pk: 2,
      title: "이 쿠폰 어떻게 씀?",
      status: "답변완료",
      completeTime: "23:00",
      writer: "올빼미",
      writeTime: "2024-01-01",
    },
    {
      pk: 3,
      title: "이 쿠폰 어떻게 씀?",
      status: "답변완료",
      completeTime: "23:00",
      writer: "올빼미",
      writeTime: "2024-01-01",
    },
    {
      pk: 4,
      title: "이 쿠폰 어떻게 씀?",
      status: "답변완료",
      completeTime: "23:00",
      writer: "올빼미",
      writeTime: "2024-01-01",
    },
    {
      pk: 5,
      title: "이 쿠폰 어떻게 씀?",
      status: "답변완료",
      completeTime: "23:00",
      writer: "올빼미",
      writeTime: "2024-01-01",
    },
  ];
  return (
    <>
      <div className="ask-wrap">
        <h1>사업자 승인 목록</h1>
        <div className="tap">
          <div className="tap-number">번호</div>
          <div className="tap-title">문의 제목</div>
          <div className="tap-status">답변여부</div>
          <div className="tap-completeTime">답변시간</div>
          <div className="tap-writer">작성자</div>
          <div className="tap-writeTime">작성날짜</div>
        </div>
        <div className="askList">
          {askItems.map(ask => (
            <div key={ask.pk} className="oneAsk">
              <div className="tap-number">{ask.pk}</div>
              <div className="tap-title">{ask.title}</div>
              <div className="tap-status">{ask.status}</div>
              <div className="tap-completeTime">{ask.completeTime}</div>
              <div className="tap-writer">{ask.writer}</div>
              <div className="tap-writeTime">{ask.writeTime}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Accept;
