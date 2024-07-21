// Image.js
import React from "react";
import PropTypes from "prop-types";

const Image = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy" // Native lazy loading
  />
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Image;
