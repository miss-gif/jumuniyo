import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="main-page">
      <ul className="main-page__list">
        <li className="main-page__item">
          <div className="main-page__image main-page__image--background">
            <div className="main-page__toggle-heart">
              <IoIosHeartEmpty />
            </div>
          </div>
          <div className="main-page__store-info">
            <div className="main-page__store-name">McDonald</div>
            <div className="main-page__score">4.5</div>
          </div>
          <div className="main-page__review-info">
            <div className="main-page__review">
              리뷰
              <span className="main-page__review-count">33</span>
            </div>
            <div className="main-page__owner-review">
              사장님리뷰
              <span className="main-page__owner-review-count">33</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
