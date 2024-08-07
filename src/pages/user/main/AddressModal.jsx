import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoLocationOutline, IoSearchSharp } from "react-icons/io5";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import "./AddressModal.scss";
import NewLocationSearch from "./NewLocationSearch";

const AddressModal = ({ isOpen, onRequestClose }) => {
  const [activeTab, setActiveTab] = useState("recent");
  const [addresses, setAddresses] = useState([]);
  const accessToken = useSelector(state => state.user.accessToken);

  useEffect(() => {
    if (activeTab === "recent") {
      const fetchAddresses = async () => {
        try {
          const response = await axios.get("/api/address/list", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setAddresses(response.data.resultData);
        } catch (error) {
          console.error("주소 목록을 불러오는 데 실패했습니다.", error);
        }
      };
      fetchAddresses();
    }
  }, [activeTab, accessToken]);

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal"
      overlayClassName="overlay"
    >
      <div className="modal__content">
        <h2 className="modal__title">주소 관리</h2>
        {/* <div className="modal__search">
          <IoSearchSharp />
          <input type="text" placeholder="주소를 검색하세요" />
        </div> */}
        <div className="new-location-search">
          <NewLocationSearch />
        </div>
        <div className="modal__tabs">
          <button
            className={`tab-button ${activeTab === "recent" ? "active" : ""}`}
            onClick={() => handleTabChange("recent")}
          >
            등록된 주소
          </button>
          <button
            className={`tab-button ${activeTab === "registered" ? "active" : ""}`}
            onClick={() => handleTabChange("registered")}
          >
            최근 사용한 주소
          </button>
        </div>

        <div className="modal__addresses">
          {activeTab === "recent" ? (
            <div className="address-list">
              {addresses.length > 0 ? (
                addresses.map(address => (
                  <div key={address.addrPk} className="address-item">
                    <div>
                      <IoLocationOutline fontSize={24} />
                    </div>
                    <div>
                      <div className="address-name">{address.addrName}</div>
                      <div className="address-detail">
                        {address.addr1} {address.addr2}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>등록된 주소가 없습니다.</div>
              )}
            </div>
          ) : (
            <div>최근 사용한 주소 목록</div>
          )}
        </div>
        <button className="modal__content-close">
          <IoIosClose fontSize={30} onClick={onRequestClose} />
        </button>
      </div>
    </Modal>
  );
};

AddressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default AddressModal;
