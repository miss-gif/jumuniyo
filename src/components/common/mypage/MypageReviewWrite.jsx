import { Rating, TextField } from "@mui/material";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const MypageReviewWrite = ({ reviewYes, reviewNo }) => {
  const [test, setTest] = useState("");
  console.log(test);
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
      />
      <div className="mypage-button-box">
        <button
          className="btn"
          onClick={() => {
            reviewYes();
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
