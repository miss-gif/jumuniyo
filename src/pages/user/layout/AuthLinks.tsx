import React from "react";
import { Link } from "react-router-dom";

// Props 타입 정의
interface AuthLinksProps {
  closeModal: () => void; // closeModal은 반환값이 없는 함수
}

const AuthLinks: React.FC<AuthLinksProps> = ({ closeModal }) => (
  <div className="user-header__auth">
    <div className="user-header__auth-login auth-btn">
      <Link to="/login" onClick={closeModal}>
        로그인
      </Link>
    </div>
    <div className="user-header__auth-signup auth-btn">
      <Link to="/auth" onClick={closeModal}>
        회원가입
      </Link>
    </div>
  </div>
);

export default AuthLinks;
