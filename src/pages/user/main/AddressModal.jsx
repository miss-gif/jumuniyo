import React, { useState } from "react";
import Modal from "react-modal";
import "./AddressModal.scss";
import PropTypes from "prop-types";

const AddressModal = ({ isOpen, onRequestClose }) => {
  const [activeTab, setActiveTab] = useState("recent");

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
        <h2>주소 관리</h2>
        <div className="modal__tabs">
          <button
            className={`tab-button ${activeTab === "recent" ? "active" : ""}`}
            onClick={() => handleTabChange("recent")}
          >
            최근 사용한 주소
          </button>
          <button
            className={`tab-button ${activeTab === "registered" ? "active" : ""}`}
            onClick={() => handleTabChange("registered")}
          >
            등록된 주소
          </button>
        </div>
        <div className="modal__search">
          <input type="text" placeholder="주소를 검색하세요" />
        </div>
        <div className="modal__addresses">
          {activeTab === "recent" ? (
            <div>최근 사용한 주소 목록</div>
          ) : (
            <div>등록된 주소 목록</div>
          )}
        </div>
      </div>
    </Modal>
  );
};

AddressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default AddressModal;
