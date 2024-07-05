import React, { useEffect } from "react";

const AddressButton = () => {
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
          const roadAddr = data.roadAddress || "";
          let extraRoadAddr = "";

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

          const guideTextBox = document.getElementById("guide");
          if (data.autoRoadAddress) {
            const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
            guideTextBox.style.display = "block";
          }
        },
      }).open();
    }
  };
  return (
    <button
      type="button"
      onClick={() => {
        sample4_execDaumPostcode();
      }}
      className="id-check"
    >
      우편번호 찾기
    </button>
  );
};

export default AddressButton;
