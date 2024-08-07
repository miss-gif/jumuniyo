import Filters from "../../../components/restaurants/Filters";
import CategoryFilter from "./CategoryFilter";
import UserHeader from "./UserHeader";
import "./UserHeaders.scss";

const UserHeaders = () => {
  return (
    <div className="user-headers">
      <UserHeader />
      <CategoryFilter />

      {/* <Filters /> */}
    </div>
  );
};

export default UserHeaders;
