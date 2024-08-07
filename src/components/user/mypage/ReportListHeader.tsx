/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";

const linkStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  border-bottom: 2px solid transparent;
  text-align: center;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  transition:
    color 0.3s,
    border-bottom-color 0.3s;

  &:hover {
    border-bottom-color: #00c4bd;
    color: #00c4bd;
  }
`;

const activeStyle = css`
  border-bottom-color: #00c4bd;
  color: #00c4bd;
`;

const ReportListHeader = () => {
  const location = useLocation();

  return (
    <div className="order-list-header">
      <Link
        to="/mypage/report/list"
        css={[
          linkStyle,
          location.pathname === "/mypage/report/list" && activeStyle,
        ]}
      >
        문의내역
      </Link>
      <Link
        to="/mypage/reportpage"
        css={[
          linkStyle,
          location.pathname === "/mypage/reportpage" && activeStyle,
        ]}
      >
        문의하기
      </Link>
    </div>
  );
};

export default ReportListHeader;
