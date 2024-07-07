/* eslint-disable react/prop-types */
import { Box, TextField } from "@mui/material";
import AddressButton from "../_AddressButton";

const MypageModal = ({
  onModifyYes,
  setAddressDetail,
  setAddress,
  onModifyNo,
}) => {
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
      <Box>
        <TextField
          fullWidth
          label="상세 주소"
          id="fullWidth"
          onChange={e => {
            setAddressDetail(e.target.value);
          }}
        />
      </Box>
      <AddressButton setAddress={setAddress} />
      <div className="mypage-button-box">
        <button
          type="button"
          onClick={() => {
            onModifyYes();
          }}
        >
          완료
        </button>
        <button
          type="button"
          onClick={() => {
            onModifyNo();
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default MypageModal;
