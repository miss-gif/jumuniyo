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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수를 관리
  const [filter, setFilter] = useState("all"); // 필터 상태 관리
  const navigate = useNavigate();

  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const fetchData = async (page: number, filter: string) => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      console.error("토큰을 찾을 수 없습니다.");
      return;
    }

    let url = `/api/admin/inquiry/inquiry_list/${page}`;
    if (filter === "unfinished") {
      url = `/api/admin/inquiry/inquiry_list_unfinished/${page}`;
    } else if (filter === "finished") {
      url = `/api/admin/inquiry/inquiry_list_finished/${page}`;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.statusCode === 1) {
        const formattedData = response.data.resultData.result.map(
          (item: any) => ({
            pk: item.inquiryPk,
            title: item.inquiryTitle,
            status: item.inquiryState === 2 ? "답변완료" : "미완료",
            completeTime: new Date(item.createdAt).toLocaleTimeString(),
          }),
        );
        setAskItems(formattedData);
        setTotalPages(response.data.resultData.totalPage); // 백엔드에서 전달하는 전체 페이지 수 설정
      } else {
        console.error("데이터 불러오기 실패:", response.data.resultMsg);
      }
    } catch (error) {
      console.error("데이터 불러오기 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, filter);
  }, [currentPage, filter]); // currentPage와 filter 변경 시 데이터를 다시 가져옴

  const handleClick = (pk: number) => {
    navigate(`/admin/ask/details/${pk}`);
  };

  const handleFilterClick = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1); // 필터를 변경하면 첫 페이지로 이동
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="ask-wrap">
      <h1 style={{ fontSize: "20px", marginBottom: "20px" }}>문의 목록</h1>
      <div className="filter-buttons" style={{ marginBottom: "20px" }}>
        <button
          className="btn"
          onClick={() => handleFilterClick("all")}
          style={{ marginRight: "10px" }}
        >
          전체보기
        </button>
        <button
          className="btn"
          onClick={() => handleFilterClick("unfinished")}
          style={{ marginRight: "10px" }}
        >
          미답변만 보기
        </button>
        <button
          className="btn"
          onClick={() => handleFilterClick("finished")}
          style={{ marginRight: "10px" }}
        >
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
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Ask;
