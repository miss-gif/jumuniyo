import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "./MyPage";
import jwtAxios from "../api/user/jwtUtil";

interface ReportDetail {
  createdAt?: string;
  inquiryResponse?: null | string;
  inquiryTitle?: string;
  inquiryContent?: string;
  updatedAt?: string;
  inquiryState?: number;
}

const MypageReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reportData, setReportData] = useState<ReportDetail>();
  const navigate = useNavigate();

  useEffect(() => {
    getReportDetail();
  }, [id]);

  const getReportDetail = async () => {
    try {
      const res = await jwtAxios.get(`/api/user/inquiry/${id}`);
      setReportData(res.data.resultData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  return (
    <div className="mypage-order">
      <div className="mypage-order-content">
        <div className="mypage-order__header">
          <h2 className="mypage-order__title">문의내역</h2>
        </div>
        <div className="mypage-order__contents">
          <div className="주문완료-안내">
            <p className="mypage-order__thanks">{reportData?.inquiryTitle}</p>
            <p className="mypage-order__confirmation">
              {reportData?.inquiryContent}
            </p>
          </div>

          <div className="mypage-order__section">
            <div className="mypage-order__section-title">답변</div>

            <p className="mypage-order__value">{reportData?.inquiryResponse}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageReportDetailPage;
