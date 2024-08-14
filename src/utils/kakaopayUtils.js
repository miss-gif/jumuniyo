import axios from "axios";

/**
 * 카카오페이 결제 요청 함수
 * @param {number} amount - 결제 금액
 * @param {string} phone - 구매자 전화번호
 * @param {string} orderId - 주문 ID
 * @param {string} accessToken - 인증 토큰
 * @param {string} request - 요청 사항
 * @param {object} locationData - 위치 데이터
 * @param {string} addressDetail - 상세 주소
 * @param {array} menuPkArray - 메뉴 PK 배열
 * @returns {Promise<string>} - 결제 완료 메시지
 */
export const initiateKakaoPay = (
  amount,
  phone,
  id,
  accessToken,
  request,
  locationData,
  addressDetail,
  menuPkArray,
) => {
  return new Promise((resolve, reject) => {
    var IMP = window.IMP;
    IMP.init("imp56341203");
    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME",
        pay_method: "카카오페이",
        merchant_uid: "GPK_" + new Date().getTime(),
        name: "주문이요-카카오페이",
        amount: amount,
        buyer_name: "buyer_name",
        buyer_tel: phone,
      },
      function (data) {
        console.log("결제 응답:", data); // 응답을 확인
        let msg;
        if (data.success) {
          msg = "결제 완료";
          msg += "// 결제 수단 : Kakao";
          msg += "// 상점 거래ID : " + data.merchant_uid;
          msg += "// 결제 금액 : " + data.paid_amount;
          msg += "// 구매자 이름 : " + data.buyer_name;

          // 서버에 결제 완료 정보를 전송하고 응답을 받아 주문 ID를 반환
          axios
            .post(
              "/api/order/",
              {
                order_res_pk: id,
                order_request: request, // 상태에서 요청사항 가져오기
                payment_method: "3", // 상태에서 결제수단 가져오기
                order_phone: phone,
                order_address: `${locationData.geocodeAddress} ${addressDetail}`, // 주소 합치기
                menu_pk: menuPkArray,
                use_mileage: 0,
                coupon: null,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            )
            .then(response => resolve(response.data.resultData)) // 주문 ID 반환
            .catch(error =>
              reject("결제 성공 후 처리 중 오류: " + error.message),
            );
        } else {
          msg = "결제 실패";
          msg += "에러 내용: " + data.error_msg;
          reject(msg);
        }
      },
    );
  });
};
