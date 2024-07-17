/* eslint-disable react/prop-types */
import React from "react";

const OwnerComment = ({ reply }) => {
  return (
    <div className="owner-comment">
      <p className="owner-comment__reply">{reply}</p>
    </div>
  );
};

export default OwnerComment;
