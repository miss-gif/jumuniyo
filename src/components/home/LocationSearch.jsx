import styled from "@emotion/styled";
import React from "react";
import { MdMyLocation } from "react-icons/md";
import { useLocation } from "react-router-dom";

const LocationSearch = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <StyledLocationSearch className="LocationSearch">
      {isHomePage && (
        <StyledHomeText>
          <h2>&quot;배달은 역시, 속전속결!&quot;</h2>
          <p>받으실 동 이름으로 검색해주세요</p>
        </StyledHomeText>
      )}
      <div className="locationSearch__group">
        <button className="LocationSearch__icon">
          <MdMyLocation />
        </button>
        <div className="locationSearch__input">
          <input
            type="text"
            placeholder="건물명, 도로명, 지번으로 검색하세요."
          />
          <button className="search-btn">검색</button>
        </div>
      </div>
    </StyledLocationSearch>
  );
};

export default LocationSearch;

const StyledLocationSearch = styled.div`
  position: sticky;
  top: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1657bf;
  padding: 30px 0;

  h2 {
    font-size: 36px;
    color: #eee;
  }
  p {
    color: #eee;
    margin: 5px 0 15px;
  }
  .locationSearch__group {
    display: flex;
    gap: 10px;
  }
  .LocationSearch__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 4px;
  }
  .locationSearch__input {
    border-radius: 4px;
    overflow: hidden;
  }
  button {
    padding: 10px;
    background-color: #fff;
  }
  input {
    padding: 0 20px;
    width: 500px;
    height: 100%;
    background-color: #fff;
  }
  .search-btn {
    background-color: $black;
    background-color: #333;
    color: #fff;
  }
`;

const StyledHomeText = styled.div``;
