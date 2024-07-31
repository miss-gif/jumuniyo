/* eslint-disable react/prop-types */
import { Rating, TextField } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import jwtAxios from "../../../api/user/jwtUtil";

const MypageReviewWrite = ({
  reviewNo,
  doneOrderPk,
  setReviewOpen,
  setSelectedOrderPk,
  getOrderList,
}) => {
  const [reviewRating, setReviewRation] = useState("");
  const [reviewWrite, setReviewWrite] = useState("");
  const [pics, setPics] = useState([]);

  const handleFilesChange = e => {
    const files = Array.from(e.target.files);
    setPics(files);
  };

  const postReview = async () => {
    const data = new FormData();
    data.append(
      "p",
      JSON.stringify({
        done_order_pk: doneOrderPk,
        review_contents: reviewWrite,
        review_rating: reviewRating, // 더 명확한 변수 이름 사용
      }),
    );

    pics.forEach(pic => {
      data.append("pics", pic);
    });

    try {
      const header = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await jwtAxios.post("/api/rev", data, header);
      if (res.data.statusCode === 1) {
        Swal.fire({
          icon: "success",
          title: "감사합니다.",
          text: res.data.resultMsg,
        });
        handleSuccess();
      } else {
        Swal.fire({
          icon: "error",
          title: "오류 발생",
          text: res.data.resultMsg,
        });
        handleSuccess();
      }
    } catch (error) {
      console.error("Error posting review:", error); // 에러 내용을 콘솔에 출력
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  const handleSuccess = () => {
    getOrderList();
    setReviewOpen(false);
    setSelectedOrderPk(null);
  };

  return (
    <div className="modify-modal">
      <h3>리뷰 쓰기</h3>
      <Rating
        name="half-rating"
        defaultValue={0}
        precision={1}
        onChange={e => {
          setReviewRation(e.target.value);
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
      <input type="file" multiple onChange={handleFilesChange} />
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
