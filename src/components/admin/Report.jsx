import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const [reportItems, setReportItems] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

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
          pk: item.reportPk,
          title: item.reportTitle,
          status: item.reportState === 1 ? "처리완료" : "미완료",
          completeTime: new Date(item.updatedAt).toLocaleTimeString(),
          writer: item.reportUserNickName,
          writeTime: new Date(item.createdAt).toLocaleDateString(),
        }));
        setReportItems(formattedData);
      } else {
        console.error("데이터 불러오기 실패:", response.data.resultMsg);
      }
    } catch (error) {
      console.error("데이터 불러오기 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    let url = "/api/admin/report/report_list";
    if (filter === "unfinished") {
      url = "/api/admin/report/report_list_unfinished";
    } else if (filter === "finished") {
      url = "/api/admin/report/report_list_finished";
    }
    fetchData(url);
  }, [filter]);

  const handleClick = pk => {
    navigate(`/admin/report/details/${pk}`);
  };

  return (
    <div className="ask-wrap">
      <h1 style={{ fontSize: "20px", marginBottom: "20px" }}>신고 목록</h1>
      <div className="filter-buttons" style={{ marginBottom: "20px" }}>
        <button
          className="btn"
          onClick={() => setFilter("all")}
          style={{ marginRight: "10px" }}
        >
          전체보기
        </button>
        <button
          className="btn"
          onClick={() => setFilter("unfinished")}
          style={{ marginRight: "10px" }}
        >
          미완료만 보기
        </button>
        <button
          className="btn"
          onClick={() => setFilter("finished")}
          style={{ marginRight: "10px" }}
        >
          처리완료만 보기
        </button>
      </div>
      <div className="tap">
        <div className="tap-number">문의 번호</div>
        <div className="tap-title">문의 제목</div>
        <div className="tap-status">처리여부</div>
        <div className="tap-completeTime">처리시간</div>
        <div className="tap-writer">작성자</div>
        <div className="tap-writeTime">작성날짜</div>
      </div>
      <div className="askList">
        {reportItems.map(ask => (
          <div
            key={ask.pk}
            className="oneAsk"
            onClick={() => handleClick(ask.pk)}
          >
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

export default Report;
