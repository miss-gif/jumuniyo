/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import PhoneNumberInput from "../../user/mypage/PhoneNumberInput";
import jwtAxios from "../../../api/user/jwtUtil";
import Swal from "sweetalert2";

const ModifyPhone = ({
  isEditPhoneNumber,
  phoneNumber,
  editMode,
  setPhoneNumber,
  editCancel,
  setIsEditPhoneNumber,
  isLogIn,
  getUserInfo,
}) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;

  const modifyPassord = async () => {
    const isCheckPhone = phoneRegex.test(newPhoneNumber);

    if (isCheckPhone === false) {
      Swal.fire({
        icon: "warning",
        text: "전화번호를 확인해주세요.",
      });
      setPhoneNumber(phoneNumber);
      return;
    }
    setIsEditPhoneNumber(false);

    const data = {
      user_phone: newPhoneNumber,
    };
    try {
      const res = await jwtAxios.patch("/api/update-phone", data);
      if (res.data.statusCode === 1) {
        Swal.fire({
          icon: "success",
          text: "전화번호 변경 완료",
        });
        getUserInfo();
      } else {
        Swal.fire({
          icon: "warning",
          text: res.data.resultMsg,
        });
        setPhoneNumber(phoneNumber);
        getUserInfo();
      }
      return res;
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  const editPhoneNumber = () => {
    setPhoneNumber(newPhoneNumber);
    modifyPassord();
  };

  return (
    <div className="mypage-title">
      <div className="mypage-title-box">전화번호</div>
      <div className="mypage-title-box-right">
        {!isEditPhoneNumber ? (
          <>
            <div>{phoneNumber}</div>
            {!isLogIn ? null : (
              <button className="btn" onClick={() => editMode("PhoneNumber")}>
                변경
              </button>
            )}
          </>
        ) : (
          <>
            <PhoneNumberInput onChange={setNewPhoneNumber} />
            <div>
              <button className="btn" onClick={editPhoneNumber}>
                저장
              </button>
              <button className="btn" onClick={editCancel}>
                취소
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModifyPhone;
