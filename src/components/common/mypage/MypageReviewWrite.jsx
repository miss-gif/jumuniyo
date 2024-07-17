/* eslint-disable react/prop-types */
import { Rating, TextField } from "@mui/material";
import { useState } from "react";
import jwtAxios from "../../../api/user/jwtUtil";

const MypageReviewWrite = ({
  reviewNo,
  resPk,
  doneOrderPk,
  setReviewOpen,
  setSelectedOrderPk,
}) => {
  const [test, setTest] = useState("");
  const [reviewWrite, setReviewWrite] = useState("");

  const postReview = async () => {
    setReviewOpen(false);
    setSelectedOrderPk(null);
    const data = {
      p: {
        done_order_pk: doneOrderPk,
        res_pk: resPk,
        review_contents: reviewWrite,
        review_rating: test,
      },
      pics: [],
    };

    try {
      const header = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await jwtAxios.post("/api/rev", data, header);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modify-modal">
      <h3>리뷰 쓰기</h3>
      <Rating
        name="half-rating"
        defaultValue={0}
        precision={0.5}
        onChange={e => {
          setTest(e.target.value);
        }}
      />
      <TextField
        id="outlined-multiline-static"
        label="나의 리뷰"
        multiline
        rows={4}
        defaultValue=""
        onChange={e => {
          setReviewWrite(e.target.value);
        }}
      />
      <div className="mypage-button-box">
        <button
          className="btn"
          onClick={() => {
            postReview();
          }}
        >
          완료
        </button>
        <button
          className="btn"
          onClick={() => {
            reviewNo();
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default MypageReviewWrite;
