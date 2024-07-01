import { Link, useNavigate } from "react-router-dom";
import JoinFooter from "../components/layout/JoinFooter";

const AuthUserPage = () => {
  const join = useNavigate();

  return (
    <>
      <div className="user-join-wrap">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
            alt="Logo"
          />
        </Link>
        <h2>일반 로그인</h2>
        <div className="line">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="576"
            height="1"
            viewBox="0 0 576 1"
            fill="none"
          >
            <path d="M0.5 0.5H575.5" stroke="black" />
          </svg>
        </div>
        <form className="user-join-form">
          <input placeholder="아이디를 입력해 주세요."></input>
          <input placeholder="비밀번호를 입력해 주세요."></input>
          <div className="join-button">
            <h6
              onClick={() => {
                join("/auth");
              }}
            >
              회원가입
            </h6>
          </div>
          <button type="button">로그인</button>
        </form>
      </div>
      <JoinFooter />
    </>
  );
};

export default AuthUserPage;
