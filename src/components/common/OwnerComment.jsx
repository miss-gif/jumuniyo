/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const OwnerComment = ({ reply }) => {
  return (
    <OwnerCommentBody className="owner-comment">
      <h2>사장님 답글</h2>
      <p className="owner-comment__reply">{reply.commentContents}</p>
    </OwnerCommentBody>
  );
};

export default OwnerComment;
const OwnerCommentBody = styled.div`
  background-color: #e6e6e6;
  border-radius: 4px;
  padding: 4px;
`;
