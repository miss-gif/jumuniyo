import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setLocationData, setSearchTerm } from "../../../app/userSlice";
import "./AddressModal.scss";
import NewLocationSearch from "./NewLocationSearch";

const MAX_RECENT_ITEMS = 5;

const AddressModal = ({ isOpen, onRequestClose }) => {
  const [activeTab, setActiveTab] = useState("registered");
  const [addresses, setAddresses] = useState([]);
  const accessToken = useSelector(state => state.user.accessToken);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const searchTerm = useSelector(state => state.user.searchTerm); // Redux에서 searchTerm 가져오기
  const [recentAddresses, setRecentAddresses] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const saveSearchTerm = () => {
    if (!recentSearches.includes(searchTerm)) {
      recentSearches.unshift(searchTerm); // 새 검색어를 리스트 앞에 추가
      if (recentSearches.length > MAX_RECENT_ITEMS) {
        recentSearches.pop(); // 최대 5개의 검색어 유지
      }
      sessionStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
  };

  useEffect(() => {
    saveSearchTerm();
  }, [searchTerm]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("/api/address/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setAddresses(response.data.resultData);
        console.log("주소 목록을 불러왔습니다.", response.data.resultData);
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

  const saveRecentAddress = address => {
    let recentAddresses =
      JSON.parse(sessionStorage.getItem("recentAddresses")) || [];

    const existingIndex = recentAddresses.findIndex(
      item => item.addrPk === address.addrPk,
    );
    if (existingIndex === -1) {
      recentAddresses.unshift(address); // 새 주소를 리스트 앞에 추가
      if (recentAddresses.length > MAX_RECENT_ITEMS) {
        recentAddresses.pop(); // 최대 5개의 최근 주소 유지
      }
      sessionStorage.setItem(
        "recentAddresses",
        JSON.stringify(recentAddresses),
      );
    }
  };

  const onClickSearch = async address => {
    dispatch(setSearchTerm(address.addr1));

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: address.addr1,
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          },
        },
      );

      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;
        // Switch latitude and longitude here
        dispatch(
          setLocationData({ latitude: location.lng, longitude: location.lat }),
        );

        saveRecentAddress(address);
      } else {
        console.error("Geocoding failed:", response.data.status);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }

    onRequestClose(); // 모달 닫기
  };

  useEffect(() => {
    const savedSearches =
      JSON.parse(sessionStorage.getItem("recentSearches")) || [];
    setRecentSearches(savedSearches); // 세션 스토리지에서 최근 검색어 불러오기
  }, [isOpen]);

  const AddressList = ({ addresses, onClickSearch }) => (
    <ul className="address-list">
      {addresses.map(address => (
        <li
          key={address.addrPk}
          className="address-item"
          onClick={() => onClickSearch(address)}
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
      ))}
    </ul>
  );

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
            addresses.length > 0 ? (
              <AddressList
                addresses={addresses}
                onClickSearch={onClickSearch}
              />
            ) : (
              <div>등록된 주소가 없습니다.</div>
            )
          ) : recentAddresses.length > 0 ? (
            <AddressList
              addresses={recentAddresses}
              onClickSearch={onClickSearch}
            />
          ) : (
            <div className="recent-searches">
              {recentSearches.length > 0 ? (
                <ul>
                  {recentSearches.map((search, index) => (
                    <li
                      key={index}
                      onClick={() => onClickSearch({ addr1: search })}
                    >
                      {search}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>최근에 사용한 주소가 없습니다.</div>
              )}
            </div>
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
