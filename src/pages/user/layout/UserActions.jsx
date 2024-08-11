import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import "./UserActions.scss";

const UserActions = ({
  toggleSidebarCart,
  toggleSidebarCoupon,
  toggleSidebarHeart,
}) => (
  <>
    <div className="user-header__cart" onClick={toggleSidebarCart}>
      <AiOutlineShoppingCart fontSize={24} />
    </div>
    <div className="user-header__heart" onClick={toggleSidebarHeart}>
      <FaRegHeart fontSize={24} />
    </div>
    <div className="user-header__coupon" onClick={toggleSidebarCoupon}>
      <RiCoupon2Line fontSize={24} />
    </div>
  </>
);

export default UserActions;
