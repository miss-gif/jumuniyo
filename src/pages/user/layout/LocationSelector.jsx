import PropTypes from "prop-types";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import "./LocationSelector.scss";

const LocationSelector = ({ searchTerm, openModal }) => {
  // 대체 텍스트를 여기서 설정
  const displayText = searchTerm || "주소검색";

  return (
    <div className="user-header__location" onClick={openModal}>
      <MdOutlineLocationOn fontSize={16} />
      <div className="wrap">
        <span>{displayText}</span>
        <IoIosArrowDown fontSize={16} />
      </div>
    </div>
  );
};

LocationSelector.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default LocationSelector;
