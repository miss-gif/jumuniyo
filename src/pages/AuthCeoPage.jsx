import { useEffect, useState } from "react";

const AuthUserPage = () => {
  useEffect(() => {
    // Daum Postcode API 스크립트 동적 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []);

  const sample4_execDaumPostcode = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          var roadAddr = data.roadAddress || "";
          var extraRoadAddr = "";

          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }

          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              (extraRoadAddr !== "" ? ", " : "") + data.buildingName;
          }

          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }

          document.getElementById("sample4_roadAddress").value = roadAddr;

          var guideTextBox = document.getElementById("guide");
          if (data.autoRoadAddress) {
            var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
            guideTextBox.style.display = "block";
          } else if (data.autoJibunAddress) {
            var expJibunAddr = data.autoJibunAddress;
            guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
            guideTextBox.style.display = "block";
          }
        },
      }).open();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = e => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };
  return (
    <div className="user-join-wrap">
      <h1>일반 회원가입</h1>
      <div className="line">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="576"
          height="1"
          viewBox="0 0 576 1"
          fill="none"
        >
          <path d="M0.5 0.5H575.5" stroke="black" />
        </svg>
      </div>
      <form className="user-join-form">
        <h2>아이디</h2>
        <div>
          <input type="text" placeholder="아이디를 입력해 주세요." />
          <button type="button">중복 확인</button>
        </div>
        <h2>비밀번호</h2>
        <input type="password" placeholder="비밀번호를 입력해 주세요." />
        <h2>비밀번호 확인</h2>
        <input type="password" placeholder="비밀번호를 다시 입력해 주세요." />
        <h2>이메일</h2>
        <input type="email" placeholder="이메일을 입력해 주세요." />
        <h2>전화번호</h2>
        <input type="tel" placeholder="전화번호를 입력해 주세요." />
        <h2>이름</h2>
        <input type="text" placeholder="이름을 입력해 주세요." />
        <h2>가게이름</h2>
        <input type="text" placeholder="가게이름을 입력해 주세요." />
        <h2>음식 카테고리</h2>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="options" value="Option 1" /> 치킨
          </label>
          <label>
            <input type="checkbox" name="options" value="Option 2" /> 햄버거
          </label>
          <label>
            <input type="checkbox" name="options" value="Option 3" /> 카페
          </label>
          <label>
            <input type="checkbox" name="options" value="Option 4" /> 죽
          </label>
          <label>
            <input type="checkbox" name="options" value="Option 5" /> 족발
          </label>
        </div>
        <h2>주소</h2>
        <input
          type="text"
          id="sample4_roadAddress"
          placeholder="도로명주소"
          readOnly
        />

        <input
          type="button"
          onClick={() => {
            sample4_execDaumPostcode();
          }}
          value="우편번호 찾기"
        />
        <h2>사업자 상호명</h2>
        <input type="text" placeholder="사업자 상호명을 입력해 주세요." />
        <h2>사업자 번호</h2>
        <input type="text" placeholder="사업자 번호를 입력해 주세요." />
        <h2>브랜드 로고</h2>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
        />
        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="이미지 미리보기" />
          </div>
        )}

        <button type="button">회원가입</button>
      </form>
    </div>
  );
};

export default AuthUserPage;
