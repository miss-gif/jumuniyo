/* eslint-disable react/prop-types */
import React from "react";

const OwnerComment = ({ reply }) => {
  return (
    <div className="owner-comment">
      <h2>사장님 답글</h2>
      <p className="owner-comment__reply">{reply.commentContents}</p>
    </div>
  );
};

export default OwnerComment;
