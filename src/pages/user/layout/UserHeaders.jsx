import CategoryFilter from "./CategoryFilter";
import UserHeader from "./UserHeader";
import LocationSearch from "../../../components/common/LocationSearch";
import "./UserHeaders.scss";

const UserHeaders = () => {
  return (
    <div className="user-headers">
      <UserHeader />
      <CategoryFilter />
      <LocationSearch />
    </div>
  );
};

export default UserHeaders;
