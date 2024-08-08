import { useEffect, useState, useCallback } from "react";
import MypageModal from "../components/common/mypage/MypageModal";
import Mypage from "../components/join/Mypage";
import jwtAxios from "../api/user/jwtUtil";
import { getCookie } from "../utils/cookie";
import NotLogin from "../components/common/mypage/NotLogin";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Alert } from "@mui/material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
  const [isFirstUser, setIsFirstUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addressName, setAddressName] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectAddrPk, setSelectAddrPk] = useState("");

  const showSwal = () => {
    Swal.fire({
      title: "확실합니까?",
      text: "되돌릴수 없다는걸 알아두세요 복구 못합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네 삭제할래요",
      cancelButtonText: "아니요",
    }).then(result => {
      deleteAddr();
    });
  };

  const fetchUserAddressList = useCallback(async () => {
    try {
      const res = await jwtAxios.get("/api/address/list");
      if (res.data.statusCode === 1) {
        setAddresses(res.data.resultData);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  }, []);

  const fetchUserAddress = useCallback(async () => {
    try {
      const res = await jwtAxios.get("/api/address/main-address");
      if (res.data.resultData) {
        const { addrPk, addr1, addr2, addrCoorX, addrCoorY } =
          res.data.resultData;
        setAddressPk(addrPk);
        setAddress(addr1);
        setAddressDetail(addr2);
        setXValue(addrCoorX);
        setYValue(addrCoorY);
        setIsFirstUser(false);
      } else {
        setIsFirstUser(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAddr = async () => {
    try {
      const res = await jwtAxios.delete(`/api/address?addr_pk=${addressPk}`);
      fetchUserAddressList();
      fetchUserAddress();
      if (res.data.statusCode === 1) {
        Swal.fire({
          icon: "success",
          text: res.data.resultMsg,
        });
      } else {
        Swal.fire({
          icon: "warning",
          text: res.data.resultMsg,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setIsLogin(false);
      setAddress("로그인 후 이용해주세요");
      setAddressDetail("로그인 후 이용해주세요");
      setIsLoading(false);
      return;
    }
    setIsLogin(true);
    fetchUserAddressList();
    fetchUserAddress();
  }, [fetchUserAddress, fetchUserAddressList, reviewSubmitted]);

  const handleAddressSubmit = async () => {
    try {
      const data = {
        addr_name: addressName,
        addr1: newAddress,
        addr2: newAddressDetail,
        addr_coor_x: newXValue,
        addr_coor_y: newYValue,
      };
      if (isFirstUser || addModalOpen) {
        await jwtAxios.post("/api/address", data);
      } else {
        data.addr_pk = addressPk;
        await jwtAxios.patch("/api/address", data);
      }
      setReviewSubmitted(true);
      fetchUserAddressList();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "서버에러입니다.",
      });
    }
  };

  const onModifyYes = () => {
    setAddress(newAddress);
    setAddressDetail(newAddressDetail);
    setXValue(newXValue);
    setYValue(newYValue);
    handleAddressSubmit();
    fetchUserAddressList();
    setIsModalOpen(false);
    setAddModalOpen(false);
  };

  const handleAddressChange = event => {
    setAddModalOpen(false);
    setIsModalOpen(false);
    const selectedAddress = addresses.find(
      address => address.addrName === event.target.value,
    );
    if (selectedAddress) {
      setAddress(selectedAddress.addr1);
      setAddressDetail(selectedAddress.addr2);
      setXValue(selectedAddress.addrCoorX);
      setYValue(selectedAddress.addrCoorY);
      setAddressPk(selectedAddress.addrPk);
    }
  };

  if (!isLogin) {
    return (
      <div className="mypage-wrap">
        <Mypage />
        <NotLogin />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mypage-wrap">
        <Mypage />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mypage-wrap" key={refreshKey}>
      <Mypage />
      <div className="mypage-box">
        {isFirstUser ? null : (
          <div className="flex-between-box">
            <div className="select-container">
              <select name="single-choice" onChange={handleAddressChange}>
                {addresses.map(address => (
                  <option key={address.addrPk} value={address.addrName}>
                    {address.addrName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mypage-button-box">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setAddModalOpen(true);
                  setIsModalOpen(false);
                }}
              >
                추가 등록
              </button>
            </div>
          </div>
        )}

        {isFirstUser ? (
          <Alert variant="outlined" severity="info">
            등록된 주소가 없습니다 주소를 등록해주세요.
          </Alert>
        ) : (
          <>
            <div className="mypage-title">
              <div className="mypage-title-box">주소</div>
              <div>{address}</div>
            </div>
            <div className="mypage-title">
              <div className="mypage-title-box">상세 주소</div>
              <div>{addressDetail}</div>
            </div>
          </>
        )}
        <div className="address-button-box">
          <div className="mypage-button-box">
            {isFirstUser ? (
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setAddModalOpen(true);
                  setIsModalOpen(false);
                }}
              >
                등록
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setAddModalOpen(false);
                    setIsModalOpen(true);
                  }}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    showSwal();
                  }}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
        {(isModalOpen || addModalOpen) && (
          <MypageModal
            setAddressName={setAddressName}
            addModalOpen={addModalOpen}
            onModifyYes={onModifyYes}
            onModifyNo={() => {
              setIsModalOpen(false);
              setAddModalOpen(false);
            }}
            setAddress={setAddress}
            setNewAddress={setNewAddress}
            setNewAddressDetail={setNewAddressDetail}
            setNewXValue={setNewXValue}
            setNewYValue={setNewYValue}
            isFirstUser={isFirstUser}
          />
        )}
      </div>
    </div>
  );
};

export default MyPageAddress;
