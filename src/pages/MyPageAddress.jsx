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
  const [addressPk, setAddressPk] = useState("");
  const [changeAddress, setChangeAddress] = useState("");

  const [isFirstUser, setIsFirstUser] = useState(false);

  useEffect(() => {
    const getUserAddress = async () => {
      try {
        const res = await jwtAxios.get("/api/address/main-address");
        console.log(res.data);
        if (!res.data.resultData) {
          console.log("뉴비입니다");
          setIsFirstUser(true);
        } else if (res.data.resultData) {
          console.log("뉴비가 아닙니다");
          setAddressPk(res.data.resultData.addrPk);
          setAddress(res.data.resultData.addr1);
          setAddressDetail(res.data.resultData.addr2);
          setXValue(res.data.resultData.addrCoorX);
          setYValue(res.data.resultData.addrCoorY);
          setIsFirstUser(false);
        }

        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
    getUserAddress();
    console.log();
  }, []);

  const editUserAddress = async () => {
    setIsModalOpen(true);
    try {
      const data = {
        addr_pk: addressPk,
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

  const addUserAddress = async () => {
    setIsModalOpen(true);
    try {
      const data = {
        addr_pk: addressPk,
        addr1: newAddress,
        addr2: newAddressDetail,
        addr_coor_x: newXValue,
        addr_coor_y: newYValue,
      };
      const res = jwtAxios.post("/api/address", data);
    } catch (error) {
      console.log(error);
    }
  };

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
          {isFirstUser === true ? (
            <button
              type="button"
              onClick={() => {
                addUserAddress();
              }}
            >
              등록
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onModify();
              }}
            >
              수정
            </button>
          )}
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
              isFirstUser={isFirstUser}
            ></MypageModal>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MyPageAddress;
