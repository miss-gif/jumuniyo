import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../../app/userSlice";
import "./AddressModal.scss";
import NewLocationSearch from "./NewLocationSearch";

const AddressModal = ({ isOpen, onRequestClose }) => {
  const [activeTab, setActiveTab] = useState("registered");
  const [addresses, setAddresses] = useState([]);
  const accessToken = useSelector(state => state.user.accessToken);
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.user.searchTerm); // Redux에서 searchTerm 읽기
  const locationData = useSelector(state => state.user.locationData); // Redux에서 searchTerm 읽기
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
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

    if (isLoggedIn) {
      fetchAddresses();
    }
  }, [isLoggedIn, activeTab, accessToken]);

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const onClickSearch = address => {
    dispatch(setSearchTerm(address.addr1));
  };

  // 현재 검색위치 확인
  useEffect(() => {
    console.log("리덕스 위치 : ", searchTerm);
    console.log("리덕스 위경도 :", locationData);
  }, [searchTerm]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal"
      overlayClassName="overlay"
    >
      <div className="modal__content">
        <h2 className="modal__title">주소 검색</h2>
        <div className="new-location-search">
          <NewLocationSearch onRequestClose={onRequestClose} />
        </div>
        <div className="modal__tabs">
          <button
            className={`tab-button ${activeTab === "registered" ? "active" : ""}`}
            onClick={() => handleTabChange("registered")}
          >
            등록된 주소
          </button>
          <button
            className={`tab-button ${activeTab === "recent" ? "active" : ""}`}
            onClick={() => handleTabChange("recent")}
          >
            최근 사용한 주소
          </button>
        </div>

        <div className="modal__addresses">
          {activeTab === "registered" ? (
            <ul className="address-list">
              {addresses.length > 0 ? (
                addresses.map(address => (
                  <li
                    key={address.addrPk}
                    className="address-item"
                    onClick={() => {
                      onClickSearch(address);
                      onRequestClose();
                      console.log("주소가 클릭됨:", address.addr1); // addr1 로그 출력
                    }}
                  >
                    <div>
                      <IoLocationOutline fontSize={24} />
                    </div>
                    <div>
                      <div className="address-name">{address.addrName}</div>
                      <div className="address-detail">
                        {address.addr1} {address.addr2}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div>등록된 주소가 없습니다.</div>
              )}
            </ul>
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
