import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import "./UserActions.scss";

const UserActions = ({ toggleSidebarRight }) => (
  <>
    <div className="user-header__cart" onClick={toggleSidebarRight}>
      <AiOutlineShoppingCart fontSize={24} />
    </div>
    <div className="user-header__heart" onClick={toggleSidebarRight}>
      <FaRegHeart fontSize={24} />
    </div>
    <div className="user-header__coupon" onClick={toggleSidebarRight}>
      <RiCoupon2Line fontSize={24} />
    </div>
  </>
);

export default UserActions;
