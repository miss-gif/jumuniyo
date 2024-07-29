/* eslint-disable react/prop-types */
import { Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import jwtAxios from "../../../api/user/jwtUtil";
import Swal from "sweetalert2";

const MypageReviewWrite = ({
  reviewNo,
  doneOrderPk,
  setReviewOpen,
  setSelectedOrderPk,
  getOrderList,
  getOrderNow,
}) => {
  const [test, setTest] = useState("");
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
        review_rating: test,
      }),
    );

    pics.forEach(pic => {
      data.append("pics", pic);
    });

    try {
      const header = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await jwtAxios.post("/api/rev", data, header);
      console.log(res.data.statusCode);
      if (res.data.statusCode === 1) {
        Swal.fire({
          icon: "success",
          title: "기다려 주셔서 감사합니다.",
          text: res.data.resultMsg,
        });
        await getOrderNow();
        await getOrderList();
        setReviewOpen(false);
        setSelectedOrderPk(null);
      } else {
        throw new Error(res.data.resultMsg);
      }
    } catch (error) {
      console.error("Error posting review:", error);
      Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: "리뷰를 저장하는 동안 오류가 발생했습니다.",
      });
    }
  };

  return (
    <div className="modify-modal">
      <h3>리뷰 쓰기</h3>
      <Rating
        name="half-rating"
        defaultValue={0}
        precision={1}
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
