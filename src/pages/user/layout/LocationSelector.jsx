import PropTypes from "prop-types";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import "./LocationSelector.scss";

const LocationSelector = ({ searchTerm, openModal }) => {
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

LocationSelector.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default LocationSelector;
