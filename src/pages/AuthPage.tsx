import { useNavigate } from "react-router-dom";
import { Logo } from "../components/common/Logo";
import JoinFooter from "../components/layout/JoinFooter";

const AuthPage: React.FC = () => {
  const joinNav = useNavigate();

  return (
    <>
      <div className="join-wrap">
        <Logo />
        <h2>회원가입</h2>
        <div className="join-top">
          도움이 필요하신 서비스 유형을 선택해주세요.
        </div>
        <div className="join-button">
          <a
            onClick={() => {
              joinNav("/auth/user");
            }}
          >
            <div className="join-user-img"></div>
            <p>일반 회원가입</p>
            <h3>
              주문이요에서 음식 주문하는
              <br /> 일반유저 회원가입 입니다.
            </h3>
          </a>
          <a
            onClick={() => {
              joinNav("/auth/ceo");
            }}
          >
            <div className="join-ceo-img"></div>
            <p>사장님 회원가입</p>
            <h3>
              주문이요에서 가게 등록하는
              <br /> 사장님유저 회원가입 입니다.
            </h3>
          </a>
        </div>
      </div>
      <JoinFooter />
    </>
  );
};

export default AuthPage;
