import { Box, TextField } from "@mui/material";
import React from "react";

const MypageModifyModal = () => {
  return (
    <div className="modify-modal">
      <Box style={{ alignItems: "center" }}>
        <TextField
          disabled
          type="text"
          id="sample4_roadAddress"
          placeholder="도로명주소"
        />
      </Box>
    </div>
  );
};

export default MypageModifyModal;
