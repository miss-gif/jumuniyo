import CategoryFilter from "./CategoryFilter";
import UserHeader from "./UserHeader";
import "./UserHeaders.scss";

const UserHeaders = () => {
  return (
    <div className="user-headers">
      <UserHeader />
      <CategoryFilter />
    </div>
  );
};

export default UserHeaders;
