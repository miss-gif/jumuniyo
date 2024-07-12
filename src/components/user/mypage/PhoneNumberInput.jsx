import { Box, TextField } from "@mui/material";
import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const PhoneNumberInput = ({ value, onChange }) => {
  const [phone, setPhone] = useState(value || "");

  const handleInputChange = e => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
    if (onChange) {
      onChange(formattedPhoneNumber);
    }
  };

  const formatPhoneNumber = value => {
    if (!value) return value;

    // eslint-disable-next-line react/prop-types
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  return (
    <div className="input-box">
      <h2>닉네임 변경</h2>
      <Box>
        <TextField
          fullWidth
          type="text"
          value={phone}
          onChange={handleInputChange}
          label="변경할 전화번호"
          placeholder="새 전화번호를 입력해주세요."
        />
      </Box>
    </div>
  );
};

export default PhoneNumberInput;
