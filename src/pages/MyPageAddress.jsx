import { useEffect, useState } from "react";
import MypageModal from "../components/common/mypage/MypageModal";
import Mypage from "../components/join/Mypage";
import jwtAxios from "../api/user/jwtUtil";
//
const MyPageAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  const [newXValue, setNewXValue] = useState(0);
  const [newYValue, setNewYValue] = useState(0);
  const [newAddress, setNewAddress] = useState("");
  const [newAddressDetail, setNewAddressDetail] = useState("");

  const getUserAddress = async () => {
    try {
      const res = await jwtAxios.get("/api/address");
      setAddress(res.data.resultData[0].addr1);
      setAddressDetail(res.data.resultData[0].addr2);
      setXValue(res.data.resultData[0].addrCoorX);
      setYValue(res.data.resultData[0].addrCoorY);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const editUserAddress = async () => {
    try {
      const data = {
        addr_pk: 2,
        addr1: newAddress,
        addr2: newAddressDetail,
        addr_coor_x: newXValue,
        addr_coor_y: newYValue,
      };
      const res = jwtAxios.patch("/api/address", data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  const onModify = () => {
    setIsModalOpen(true);
  };

  const onModifyYes = () => {
    setIsModalOpen(false);
    setAddress(newAddress);
    setAddressDetail(newAddressDetail);
    setXValue(newXValue);
    setXValue(newYValue);
    editUserAddress();
  };

  const onModifyNo = () => {
    setIsModalOpen(false);
    getUserAddress();
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

        <div className="mypage-button-box">
          <button
            type="button"
            onClick={() => {
              onModify();
            }}
          >
            수정
          </button>
        </div>
        {isModalOpen ? (
          <>
            <MypageModal
              onModifyYes={onModifyYes}
              onModifyNo={onModifyNo}
              setAddress={setAddress}
              setNewAddress={setNewAddress}
              setNewAddressDetail={setNewAddressDetail}
              setNewXValue={setNewXValue}
              setNewYValue={setNewYValue}
            ></MypageModal>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MyPageAddress;
