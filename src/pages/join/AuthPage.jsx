import { useNavigate } from "react-router-dom";
import JoinFooter from "../../components/layout/JoinFooter";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const joinNav = useNavigate();

  return (
    <>
      <div className="join-wrap">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
            alt="Logo"
          />
        </Link>
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
            <h3>
              주문이요에서 음식 주문하는
              <br /> 일반유저 회원가입 입니다.
            </h3>
            <p>일반 회원가입</p>
          </a>
          <a
            onClick={() => {
              joinNav("/auth/ceo");
            }}
          >
            <div className="join-ceo-img"></div>
            <h3>
              주문이요에서 가게 등록하는
              <br /> 사장님유저 회원가입 입니다.
            </h3>
            <p>사장님 회원가입</p>
          </a>
        </div>
      </div>
      <JoinFooter />
    </>
  );
};

export default AuthPage;
