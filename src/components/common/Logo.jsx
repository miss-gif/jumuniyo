import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled"; // 이모션 styled 함수 import

export const Logo = () => {
  return (
    <StyledLink to="/">
      <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Logo" />
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  img {
    height: 60px;
  }
`;
