import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <StyleTitle>
      <h2>404 - 페이지를 찾을 수 없습니다.</h2>
      <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
      <button
        className="btn"
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로
      </button>
    </StyleTitle>
  );
};

export default NotFound;

const StyleTitle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 3rem;
  }
  p {
    font-size: 1.5rem;
    color: #666;
  }
  button {
    margin: 20px;
  }
`;
