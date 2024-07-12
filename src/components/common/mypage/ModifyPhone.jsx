/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PhoneNumberInput from "../../user/mypage/PhoneNumberInput";
import jwtAxios from "../../../api/user/jwtUtil";

const ModifyPhone = ({
  isEditPhoneNumber,
  phoneNumber,
  editMode,
  setPhoneNumber,
  editCancel,
  setIsEditPhoneNumber,
}) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const modifyPassord = async () => {
    const data = {
      user_phone: newPhoneNumber,
    };
    try {
      const res = await jwtAxios.patch("/api/update-phone", data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const editPhoneNumber = () => {
    setIsEditPhoneNumber(false);
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
            <button className="btn" onClick={() => editMode("PhoneNumber")}>
              변경
            </button>
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
