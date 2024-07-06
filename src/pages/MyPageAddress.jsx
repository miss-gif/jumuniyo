import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AddressButton from "../components/common/_AddressButton";
import Mypage from "../components/join/Mypage";

const MyPageAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  // const [realAdress, setRealAdress] = useState("");
  // const [realAddressDetail, setRealAddressDetail] = useState("");
  const aaa = "";
  useEffect(() => {
    if (address || addressDetail == "") {
      setAddress("주소를 입력해주세요");
      setAddressDetail("상세 주소를 입력해주세요");
    }
  }, []);

  const onModify = () => {
    setIsModalOpen(true);
  };

  const onModifyYes = () => {
    setIsModalOpen(false);
    setAddress(address);
    setAddressDetail(addressDetail);
  };

  const onModifyNo = () => {
    setIsModalOpen(false);
    setAddress(aaa);
    setAddressDetail(aaa);
    if (address || addressDetail == "") {
      setAddress("주소를 입력해주세요");
      setAddressDetail("상세 주소를 입력해주세요");
    }
  };

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        <div className="mypage-title">
          <div className="mypage-title-box">주소</div>
          <div>{address}</div>
        </div>
        <div className="mypage-title">
          <div className="mypage-title-box">상세 주소</div>
          <div>{addressDetail}</div>
        </div>
        <div className="mypage-address">
          <button
            type="button"
            onClick={() => {
              onModify();
            }}
          >
            수정 하기
          </button>
        </div>
        <div className="mypage-button-box">
          <button type="button">저장</button>
          <button type="button">삭제</button>
        </div>
        {isModalOpen ? (
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
        ) : null}
      </div>
    </div>
  );
};

export default MyPageAddress;
