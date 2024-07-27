/* eslint-disable react/prop-types */
import { Box, TextField } from "@mui/material";
import MyMap from "../../user/mypage/MyMap";

const MypageModal = ({
  onModifyYes,
  onModifyNo,
  setNewAddress,
  setNewAddressDetail,
  setNewXValue,
  setNewYValue,
  addModalOpen,
  setAddressName,
}) => {
  return (
    <div className="modify-modal">
      {addModalOpen ? <h2>주소 등록</h2> : <h2>주소 수정</h2>}

      <Box>
        <TextField
          fullWidth
          label="주소 이름"
          id="fullWidth"
          onChange={e => {
            setAddressName(e.target.value);
          }}
        />
      </Box>

      <Box style={{ alignItems: "center" }}>
        <MyMap
          setNewXValue={setNewXValue}
          setNewYValue={setNewYValue}
          setNewAddress={setNewAddress}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          label="상세 주소"
          id="fullWidth"
          onChange={e => {
            setNewAddressDetail(e.target.value);
          }}
        />
      </Box>
      {/* <AddressButton setAddress={setAddress} /> */}
      <div className="mypage-button-box">
        <button
          type="button"
          className="btn"
          onClick={() => {
            onModifyYes();
          }}
        >
          완료
        </button>
        <button
          type="button"
          className="btn"
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
