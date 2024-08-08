import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Ask = () => {
  const [askItems, setAskItems] = useState([]);
  const navigate = useNavigate();

  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        console.error("토큰을 찾을 수 없습니다.");
        return;
      }

      try {
        const response = await axios.get("/api/admin/inquiry/inquiry_list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.statusCode === 1) {
          const formattedData = response.data.resultData.map(item => ({
            pk: item.reportPk,
            title: item.reportTitle,
            status: item.reportState === 1 ? "처리완료" : "미완료",
            completeTime: new Date(item.updatedAt).toLocaleTimeString(),
            writer: item.reportUserNickName,
            writeTime: new Date(item.createdAt).toLocaleDateString(),
          }));
          setAskItems(formattedData);
        } else {
          console.error("데이터 불러오기 실패:", response.data.resultMsg);
        }
      } catch (error) {
        console.error("데이터 불러오기 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = pk => {
    navigate(`/admin/ask/details/${pk}`);
  };
  return (
    <div className="ask-wrap">
      <h1>문의 목록</h1>
      <div className="tap">
        <div className="tap-number">문의 번호</div>
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
  );
};

export default Ask;
