import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import "./LocationSelector.scss";

// Props 타입 정의
interface LocationSelectorProps {
  searchTerm: string;
  openModal: () => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  searchTerm,
  openModal,
}) => {
  // 대체 텍스트 설정
  let displayText = searchTerm || "검색 위치를 입력하세요";

  // 첫 번째 띄어쓰기 앞의 텍스트 제거
  const firstSpaceIndex = displayText.indexOf(" ");
  if (firstSpaceIndex !== -1) {
    displayText = displayText.slice(firstSpaceIndex + 1);
  }

  // 텍스트 길이 10자 제한 및 말줄임표 처리
  const truncatedText =
    displayText.length > 10 ? `${displayText.slice(0, 10)}...` : displayText;

  return (
    <div className="user-header__location" onClick={openModal}>
      <MdOutlineLocationOn />
      <span>{truncatedText}</span>
      <IoIosArrowDown />
    </div>
  );
};

export default LocationSelector;
