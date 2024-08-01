import Modal from "react-modal";
import "./AddressModal.scss";
import PropTypes from "prop-types";

const AddressModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal__content">
        <div className="project-modal__info">
          <h2>123</h2>
          <p>111</p>
          <ul className="tag__list"></ul>
          <button>확인</button>
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
