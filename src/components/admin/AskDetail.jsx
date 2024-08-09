import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AskDetail = () => {
  const { id } = useParams(); // URL에서 pk를 가져옴
  const [askDetail, setAskDetail] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const fetchDetail = async () => {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        console.error("토큰을 찾을 수 없습니다.");
        return;
      }

      try {
        const response = await axios.get(`/api/admin/inquiry/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.statusCode === 1) {
          setAskDetail(response.data.resultData);
          setResponseText(response.data.resultData.inquiryResponse || "");
        } else {
          console.error("데이터 불러오기 실패:", response.data.resultMsg);
          setError(response.data.resultMsg);
        }
      } catch (error) {
        console.error("데이터 불러오기 중 오류 발생:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchDetail();
  }, [id]);

  const handleResponseSubmit = async () => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      console.error("토큰을 찾을 수 없습니다.");
      return;
    }

    try {
      const method = askDetail.inquiryResponse ? "put" : "post";
      const response = await axios({
        method,
        url: "/api/admin/inquiry/response",
        data: {
          inquiryPk: id,
          inquiryResponse: responseText,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.statusCode === 1) {
        setAskDetail(prevDetail => ({
          ...prevDetail,
          inquiryResponse: responseText,
        }));
        setIsEditing(false);
      } else {
        console.error("답변 전송 실패:", response.data.resultMsg);
        setError(response.data.resultMsg);
      }
    } catch (error) {
      console.error("답변 전송 중 오류 발생:", error);
      setError("답변을 전송하는 중 오류가 발생했습니다.");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!askDetail) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="askDetail-wrap">
      <h1>No. {id}</h1>
      <div className="ask">
        <div className="askTitle">{askDetail.inquiryTitle}</div>
        <div className="askWriter">
          <div className="askWriter-tab">작성자</div>
          <div className="askWriter-value">{askDetail.inquiryNickName}</div>
        </div>
        <div className="askTime">
          <div className="askTime-tab">작성날짜</div>
          <div className="askTime-value">
            {new Date(askDetail.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="askContent">{askDetail.inquiryContent}</div>
        <div className="answerContent">
          {isEditing ? (
            <textarea
              value={responseText}
              onChange={e => setResponseText(e.target.value)}
              placeholder="답변을 입력하세요"
            />
          ) : (
            askDetail.inquiryResponse || "답변이 아직 없습니다."
          )}
        </div>
      </div>
      <div className="responseSection">
        {isEditing ? (
          <button className="btn" onClick={handleResponseSubmit}>
            답변 저장하기
          </button>
        ) : (
          <button className="btn" onClick={handleEditClick}>
            {askDetail.inquiryResponse ? "답변 수정하기" : "답변 남기기"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AskDetail;
