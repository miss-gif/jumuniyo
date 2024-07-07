import { useEffect, useState } from "react";
import MypageModal from "../components/common/mypage/MypageModal";
import Mypage from "../components/join/Mypage";

const MyPageAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
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
          <MypageModal
            onModifyYes={onModifyYes}
            onModifyNo={onModifyNo}
            setAddress={setAddress}
            setAddressDetail={setAddressDetail}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MyPageAddress;
