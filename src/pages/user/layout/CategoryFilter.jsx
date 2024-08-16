/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingSpinner from "../../../components/common/LoadingSpinner.jsx";
import useCategories from "../../../hooks/useCategories.js";

// 스타일이 적용된 리스트 항목 컴포넌트
const ListItem = styled.li`
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${props => (props.isActive ? "#00c4bd" : "transparent")};
  color: ${props => (props.isActive ? "white" : "black")};
  border-radius: 4px;
`;

const CategoryFilter = () => {
  const [isMenuSearchVisible, setMenuSearchVisible] = useState(false);
  const menuSearchRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 카테고리 ID 추출

  const parseCategoryId = queryString => {
    const params = new URLSearchParams(queryString);
    const categoryId = params.get("category_id");
    return categoryId ? parseInt(categoryId, 10) : null;
  };

  // id가 'category_id=8'과 같은 형태일 때 처리
  const categoryId = parseCategoryId(id);

  const { categories, loading, error } = useCategories();

  const onClickMenuSearch = () => {
    setMenuSearchVisible(!isMenuSearchVisible);
  };

  const handleClickOutside = event => {
    if (
      menuSearchRef.current &&
      !menuSearchRef.current.contains(event.target)
    ) {
      setMenuSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onClickLink = categoryPk => () => {
    navigate(`/restaurant/category_id=${categoryPk}`);
  };

  // 카테고리 ID를 기준으로 활성화 상태 결정
  const activeCategory = categoryId;

  if (loading) return <LoadingSpinner />;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <>
      <div className="background-color">
        <div className="inner">
          <div className="restaurants-page__filters">
            <button className="search-btn none" onClick={onClickMenuSearch}>
              <SearchIcon />
            </button>

            {/* Swiper 적용 */}
            <Swiper
              spaceBetween={0}
              slidesPerView={10}
              className="filters__list"
            >
              <SwiperSlide>
                <ListItem
                  isActive={activeCategory === 0}
                  onClick={onClickLink(0)}
                >
                  전체보기
                </ListItem>
              </SwiperSlide>
              {categories.map(category => (
                <SwiperSlide key={category.categoryPk}>
                  <ListItem
                    isActive={activeCategory === category.categoryPk}
                    onClick={onClickLink(category.categoryPk)}
                  >
                    <img
                      src={category.categoryPic}
                      alt={category.categoryName}
                    />
                    {category.categoryName}
                  </ListItem>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
