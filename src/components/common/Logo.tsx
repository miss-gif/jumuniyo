import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

interface LogoProps {
  style?: React.CSSProperties;
}

export const Logo: React.FC<LogoProps> = ({ style }) => {
  return (
    <StyledLink to="/">
      <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Logo" />
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 200px;
    height: 100px;
  }
`;
