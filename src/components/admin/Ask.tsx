/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AskItem {
  pk: number;
  title: string;
  status: string;
  completeTime: string;
}

const Ask: React.FC = () => {
  const [askItems, setAskItems] = useState<AskItem[]>([]);
  const navigate = useNavigate();

  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const fetchData = async (url: string) => {
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
        const formattedData = response.data.resultData.map((item: any) => ({
          pk: item.inquiryPk,
          title: item.inquiryTitle,
          status: item.inquiryState === 2 ? "답변완료" : "미완료",
          completeTime: new Date(item.createdAt).toLocaleTimeString(),
        }));
        setAskItems(formattedData);
      } else {
        console.error("데이터 불러오기 실패:", response.data.resultMsg);
      }
    } catch (error) {
      console.error("데이터 불러오기 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchData("/api/admin/inquiry/inquiry_list");
  }, []);

  const handleClick = (pk: number) => {
    navigate(`/admin/ask/details/${pk}`);
  };

  const handleFilterClick = (filter: string) => {
    let url = "/api/admin/inquiry/inquiry_list";
    if (filter === "unfinished") {
      url = "/api/admin/inquiry/inquiry_list_unfinished";
    } else if (filter === "finished") {
      url = "/api/admin/inquiry/inquiry_list_finished";
    }
    fetchData(url);
  };

  return (
    <div className="ask-wrap">
      <h1>문의 목록</h1>
      <div className="filter-buttons">
        <button onClick={() => handleFilterClick("all")}>전체보기</button>
        <button onClick={() => handleFilterClick("unfinished")}>
          미답변만 보기
        </button>
        <button onClick={() => handleFilterClick("finished")}>
          답변만 보기
        </button>
      </div>
      <div className="tap">
        <div className="tap-number">문의 번호</div>
        <div className="tap-title">문의 제목</div>
        <div className="tap-status">답변여부</div>
        <div className="tap-writeTime">작성날짜</div>
      </div>
      <div className="askList">
        {askItems.map(ask => (
          <div
            key={ask.pk}
            className="oneAsk"
            onClick={() => handleClick(ask.pk)}
          >
            <div className="tap-number">{ask.pk}</div>
            <div className="tap-title">{ask.title}</div>
            <div className="tap-status">{ask.status}</div>
            <div className="tap-writeTime">{ask.completeTime}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ask;
