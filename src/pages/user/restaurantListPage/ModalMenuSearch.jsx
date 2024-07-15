import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types"; // PropTypes import

const ModalMenuSearch = ({ menuSearchRef, isVisible }) => {
  return (
    isVisible && (
      <li className="modal-menuSearch" ref={menuSearchRef}>
        <div className="wrap">
          <input type="text" placeholder="음식점이나 메뉴를 검색해보세요." />
          <button className="modal-menuSearch__btn">
            <SearchIcon />
          </button>
        </div>
      </li>
    )
  );
};

// PropTypes 정의 (컴포넌트 내부 또는 하단)
ModalMenuSearch.propTypes = {
  menuSearchRef: PropTypes.object, // 복잡한 객체인 경우 PropTypes.shape 사용
  isVisible: PropTypes.bool.isRequired, // 필수적인 경우 isRequired 추가
};

export default ModalMenuSearch;
