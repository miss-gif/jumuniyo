import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

const LocationSelector = ({ searchTerm, openModal }) => (
  <div className="user-header__location" onClick={openModal}>
    <MdOutlineLocationOn />
    <span>{searchTerm}</span>
    <IoIosArrowDown />
  </div>
);

LocationSelector.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default LocationSelector;
