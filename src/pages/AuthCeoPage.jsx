import { useEffect } from "react";
import { Link } from "react-router-dom";
import ImageImport from "../components/layout/ImageImport";
import JoinFooter from "../components/layout/JoinFooter";

const AuthUserPage = () => {
  useEffect(() => {
    // 카카오 지도 API 스크립트 동적 로드
    const kakaoScript = document.createElement("script");
    kakaoScript.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=5fd466bd4583f4b11d09e4fe728d2fa5&libraries=services";
    kakaoScript.async = true;
    document.body.appendChild(kakaoScript);

    kakaoScript.onload = () => {
      // 지도 초기화
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(
        "제주특별자치도 제주시 첨단로 242",
        function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new window.kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        },
      );
    };

    return () => {
      document.body.removeChild(kakaoScript); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []);

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
    <>
      <div className="user-join-wrap">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
            alt="Logo"
          />
        </Link>

        <h2>사장님 회원가입</h2>
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
          <h3>아이디</h3>
          <div>
            <input type="text" placeholder="아이디를 입력해 주세요." />
            <button type="button" className="id-check">
              중복 확인
            </button>
          </div>
          <h3>비밀번호</h3>
          <input type="password" placeholder="비밀번호를 입력해 주세요." />
          <h3>비밀번호 확인</h3>
          <input type="password" placeholder="비밀번호를 다시 입력해 주세요." />
          <h3>이름</h3>
          <input type="text" placeholder="이름을 입력해 주세요." />
          <h3>닉네임</h3>
          <input type="text" placeholder="닉네임을 입력해 주세요." />
          <h3>오픈시간</h3>
          <input type="time" />
          <h3>마감시간</h3>
          <input type="time" />

          <h3>전화번호</h3>
          <input type="tel" placeholder="전화번호를 입력해 주세요." />
          <h3>가게이름</h3>
          <input type="text" placeholder="가게이름을 입력해 주세요." />
          <h3>음식 카테고리</h3>
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
          <h3>주소</h3>
          <div>
            <input
              type="text"
              id="sample4_roadAddress"
              placeholder="도로명주소"
              readOnly
            />
            <button
              type="button"
              onClick={sample4_execDaumPostcode}
              className="id-check"
            >
              우편번호 찾기
            </button>
          </div>
          <h3>상세 주소</h3>
          <input type="text" placeholder="상세 주소를 입력해 주세요." />

          <h3>사업자 상호명</h3>
          <input type="text" placeholder="사업자 상호명을 입력해 주세요." />
          <h3>사업자 번호</h3>
          <input type="text" placeholder="사업자 번호를 입력해 주세요." />
          <h3>브랜드 로고</h3>
          <ImageImport />
          <button type="button">회원가입</button>
        </form>
      </div>
      <JoinFooter />
    </>
  );
};

export default AuthUserPage;
