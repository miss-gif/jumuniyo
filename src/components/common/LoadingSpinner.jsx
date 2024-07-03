import styled from "@emotion/styled";
import { PulseLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <Loading>
      <PulseLoader color="#36d7b7" />
      <Text>Loading...</Text>
    </Loading>
  );
};

export default LoadingSpinner;

const Loading = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 99;
`;

const Text = styled.p`
  color: #57d7b7;
  font-weight: 500;
`;
