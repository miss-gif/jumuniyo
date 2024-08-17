import { IoSearchSharp } from "react-icons/io5";
import GoogleMaps from "../../../components/common/GoogleMaps";

const NewLocationSearch = ({ onRequestClose }) => {
  return (
    <div>
      <div className="새로운서치">
        <IoSearchSharp fontSize={20} />
        <div className="새로운인풋">
          <GoogleMaps onRequestClose={onRequestClose} />
        </div>
      </div>
    </div>
  );
};

export default NewLocationSearch;
